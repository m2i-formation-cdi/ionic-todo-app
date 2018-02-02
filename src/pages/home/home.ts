import { Component } from '@angular/core';
import { FormPage } from '../form/form';
import { NavController } from 'ionic-angular';
import { TodoProvider } from './../../providers/todo/todo';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todoList


  public filterList: string[] = ['Toutes','En cours','Terminées'];

  public selectedFilter:string = 'Toutes';

  constructor(public navCtrl: NavController
    ,public todoProvider: TodoProvider
    ,public alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.filterTodo();
  }

  ionViewWillEnter(){
    this.selectedFilter = 'Toutes';
    this.filterTodo();
  }

  filterTodo(){
    let selectedItem = this.selectedFilter.trim();
    if(selectedItem == 'En cours'){
      this.todoList = this.todoProvider.getNotDone();
    } else if(selectedItem == 'Terminées'){
      this.todoList = this.todoProvider.getDone();
    } else {
      this.todoProvider.getAll().then(
        (data)=>{
          this.todoList = data;
          console.log(this.todoList);
        }
      ); 
    }
  }

  delete(pos){
    let alertOptions = {
      title: 'Voulez-vous supprimer cette tâche ?',
      buttons: [
        {text: 'OUI', handler: ()=>{this.todoProvider.delete(pos);} },
        {text: 'NON', role: 'cancel'}
      ]
    };

    this.alertCtrl.create(alertOptions).present();    
  }

  edit(todo){
    this.navCtrl.push(FormPage, {todo: todo});
  }

  add(){
    this.navCtrl.push(FormPage);
  }

  changeDone(todo){
    todo.done = !todo.done;
    this.todoProvider.edit(todo);
    if(this.selectedFilter != "Toutes"){
      this.filterTodo();
    }
   
  }
}
