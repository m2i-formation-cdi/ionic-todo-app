import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class TodoProvider {

  private todoList = [
    {task: 'Sortir le chat', done: false},
    {task: 'Nourir le chat', done: false},
    {task: 'Caresser le chat', done: true},
    {task: 'Terminer le TP', done: true},
    {task: 'Faire un commit', done: false},

  ];

  public getAll(){
    return this.todoList;
  }

  public getDone(){
    return this.todoList.filter((item)=>{return item.done});
  }

  public getNotDone(){
    return this.todoList.filter((item)=>{return ! item.done});
  }

  public delete(pos){
    this.todoList.splice(pos, 1);
  }

  add(todo){
    this.todoList.push(todo);
  }

  edit(todo){
    //rien à faire pour l'instant
  }
}
