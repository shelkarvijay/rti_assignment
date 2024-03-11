import Dexie, { Table } from 'dexie';

export interface AddEmployee {
  id: number;
  employeeName: string;
  employeeRole: string;
  employeeDate: string;
  employeeNoDate: string;
}
export interface Employee {
  id?: number;
  employeeId: number;
  employeeTitle: string;
  done?: boolean;
}

export class AppDB extends Dexie {
//   employeeItems!: Table<Employee, number>;
//   todoLists!: Table<TodoList, number>;
  addEmployee!: Table<AddEmployee, number>;

  constructor() {
    super('employeeTable');
    this.version(1).stores({
        addEmployee: '++id',
        // employeeItems: '++id, todoListId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // const todoListId = await db.addEmployee.add({
    //     employeeName: 'To Do Today',
    //     employeeRole: '',
    //     employeeDate: '',
    //     employeeNoDate: ''
    // });
    // await db.employeeItems.bulkAdd([
    //   {
    //     employeeId: 1,
    //     employeeTitle: 'Feed the birds',
    //   },
    //   {
    //     employeeId: 2,
    //     employeeTitle: 'Watch a movie',
    //   },
    //   {
    //     employeeId: 3,
    //     employeeTitle: 'Have some sleep',
    //   },
    // ]);
  }
}

export const db = new AppDB();