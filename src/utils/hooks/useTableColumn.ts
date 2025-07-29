import { computed, unref, shallowRef, watchEffect, ref, reactive, watch, onMounted } from 'vue';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
import type { ColumnType } from 'ant-design-vue/lib/table';
import type { ComputedRef, MaybeRef, Ref } from 'vue';

/*import _default from 'ant-design-vue/es/color-picker';*/
import mounted = _default.mounted;
import IndexDBWrapper from "indexdbwrapper";
import login from '@/views/user/login.vue';
import antInput from 'ant-design-vue/es/_util/antInputDirective';
import created = antInput.created;

type Key = number | string;
export type TableOptions = {
  needRowIndex?: boolean | Ref<boolean>;
  defaultCheckedList?: MaybeRef<Key[]>;
};
export type DynamicColumnItem = {
  key: Key;
  label: string;
  checked: boolean;
};

export type DynamicColumnState = {
  checkAll: boolean;
  checkedList: Key[];
  needRowIndex: boolean;
  indeterminate: boolean;
};

export interface DynamicColumns {
  dynamicColumns: Ref<ColumnType[]>;
  dynamicColumnItems: ComputedRef<DynamicColumnItem[]>;
  state: DynamicColumnState;
  reset: () => void;
  handleColumnChange: (e: CheckboxChangeEvent, column: DynamicColumnItem) => void;
  handleColumnAllClick: (e: CheckboxChangeEvent) => void;
  move: (index: number, targetIndex: number) => void;
}

// columns 支持响应式，排序会影响原数组，所以，不同表格不能也不该使用同一份 columns，如果你需要共用，建议你使用函数返回，确保每一个 table 使用的都是独立的配置
export const useTableDynamicColumns = (
  columns: ColumnType[] | Ref<ColumnType[]>,
  defOptions: TableOptions = {},
): DynamicColumns => {
  const defaultRowIndexColumn = {
    title: '序号',
    dataIndex: 'my-custom-show-index',
    key: 'my-custom-show-index',
    customRender: ({ index }: any) => `${index + 1}`,
  };

  const getKey = (column: ColumnType) =>
    column?.key ??
    (Array.isArray(column.dataIndex)
      ? (column.dataIndex as []).join('$$')
      : (column.dataIndex as string));
  const mergedColumns = shallowRef<ColumnType[]>([]);

  watch(
    () => columns,
    () => {
      mergedColumns.value = unref(columns || [])
        .slice()
        .map(column => {
          return { ...column, key: getKey(column) };
        });
    },
    { immediate: true, deep: true },
  );

  let defaultCheckedList =
    unref(defOptions.defaultCheckedList) ?? mergedColumns.value.map(column => column.key) ?? [];
  watch(
    () => unref(defOptions.defaultCheckedList),
    val => {
      if (val) {
        defaultCheckedList = val;
      }
    },
  );
  const db = new IndexDBWrapper('check',1,{
    onupgradeneeded(e){
      const innerDb = e.target.result
      innerDb.createObjectStore('t1',{
        autoIncrement: false, // 自增
        keyPath: 'id' //主键
      })
    }
  })
 db.getAll('t1').then(res => {
    defaultCheckedList = res[0].checkList
  })

//defaultCheckedList = JSON.parse(localStorage.getItem('checkList')).checkList




  /*let checkedList = ref([])*/

  /*let dbDefaultCheckList = ()=>{
    let dbDefaultCheckList
    db.getAll('t1').then(res=>{

      dbDefaultCheckList =  res[0].checkList
      //checkedList = ref(dbDefaultCheckList)
    }).then(res => {
     return dbDefaultCheckList
    })


  }*/


  const checkedList = ref(defaultCheckedList);
  const state = reactive<DynamicColumnState>({
    checkAll: false,
    needRowIndex: false,
    checkedList: defaultCheckedList,
    indeterminate: true,
  });

  const listMap = computed(() => {
    return new Map(state.checkedList.map((c, index) => [c, index]));
  });
  const columnsMap = computed(() => {
    return new Map(mergedColumns.value.map((c, index) => [c.key, index]));
  });

  watchEffect(() => {
    state.needRowIndex = !!unref(defOptions.needRowIndex);
    state.checkedList = checkedList.value.filter(key => columnsMap.value.has(key));
  });

  watch(
    [() => state.checkedList, mergedColumns],
    () => {
      state.checkAll = state.checkedList.length === mergedColumns.value.length;
      state.indeterminate =
        !!state.checkedList.length && state.checkedList.length < mergedColumns.value.length;
    },
    { immediate: true },
  );

  const dynamicColumns = ref([]);
  watch(
    [mergedColumns, () => state.needRowIndex, () => state.checkedList],
    () => {
      let newColumns = mergedColumns.value.slice();
      newColumns = newColumns
        .filter(item => {
          return listMap.value.has(item.key);
        })
        .sort((a, b) => {
          const aKey = a.key as string;
          const bKey = b.key as string;
          return columnsMap.value.get(aKey) - columnsMap.value.get(bKey);
        })
        .map(item => item);
      if (state.needRowIndex) {
        newColumns.unshift(defaultRowIndexColumn);
      }
      dynamicColumns.value = newColumns;
    },
    { immediate: true },
  );

  const dynamicColumnItems = computed<DynamicColumnItem[]>(() =>
    mergedColumns.value.map(column => {
      return {
        key: column.key,
        label: column.title,
        checked: listMap.value.has(column.key),
        disabled:column.disabled || false
      } as DynamicColumnItem;
    }),
  );
  const dynamicColumnValues = computed(() => dynamicColumnItems.value.map((column) => {

      return column.key

  } ));
  const handleColumnChange = (e: CheckboxChangeEvent, column: DynamicColumnItem) => {
    const checked = (e.target as HTMLInputElement).checked;
    column.checked = checked;
    if (checked) {

      if (!listMap.value.has(column.key)) {
        checkedList.value = [...state.checkedList, column.key];
      }
      const dbCheckList = {
        checkList: [].concat(checkedList.value),
        id: 1
      }
      db.open()
      db.clear('t1')
      db.put('t1',dbCheckList)
      db.getAll('t1').then((res)=>{
      })
      localStorage.setItem('checkList',JSON.stringify(dbCheckList))
      console.log(JSON.parse(localStorage.getItem('checkList')).checkList)
    } else {

      checkedList.value = state.checkedList.filter(item => item !== column.key);
      const dbCheckList = {
        checkList: [].concat(checkedList.value),
        id: 1
      }
      db.open()
      db.clear('t1')
      db.put('t1',dbCheckList)
      localStorage.setItem('checkList',JSON.stringify(dbCheckList))
      console.log(JSON.parse(localStorage.getItem('checkList')).checkList)
    }
  };

  const handleColumnAllClick = (e: CheckboxChangeEvent) => {
    const checked = (e.target as HTMLInputElement).checked;

    checkedList.value = checked ? dynamicColumnValues.value : [];
  };

  const reset = () => {
    checkedList.value = defaultCheckedList;
    mergedColumns.value = mergedColumns.value
      .sort((a, b) => defaultCheckedList.indexOf(a.key) - defaultCheckedList.indexOf(b.key))
      .slice();
  };

  const move = (index: number, targetIndex: number) => {
    const newColumns = mergedColumns.value.slice();
    const columnItem = newColumns[index];
    newColumns.splice(index, 1);
    if (targetIndex === 0) {
      newColumns.unshift(columnItem);
    } else {
      newColumns.splice(targetIndex, 0, columnItem);
    }
    mergedColumns.value = newColumns;
  };
  return {
    dynamicColumns,
    dynamicColumnItems,
    state,
    reset,
    handleColumnAllClick,
    handleColumnChange,
    move,
    db
  };
};
