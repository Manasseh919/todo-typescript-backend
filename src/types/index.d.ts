export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IICon {
  name: string;
  id: string;
  symbol: string;
}

export interface ICategory {
  _id:string
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IICon;
}


export interface ITask {
  _id: string
  name: string
  isCompleted: boolean
  categoryId: string
  createdAt: string
  date: string
}