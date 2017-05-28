import React from 'react'
import TodoItems from '../components/TodoItems';
import AddItem from '../components/AddItem';
import Layout from '../components/Layout'

import Parse from 'parse';

import {PARSE_APP_ID,PARSE_SERVER_URL} from '../config.js';


export default class extends React.Component {


  constructor(){
    super();
    this.state = {
      items : [],
      isFetching:true,
      todoList:{},
    }
    Parse.initialize(PARSE_APP_ID);
    Parse.serverURL = PARSE_SERVER_URL;
  }

  async componentDidMount() {
    //Récupération de la todoList
    var TodoList = Parse.Object.extend("TodoList");
    var query = new Parse.Query(TodoList);
    query.equalTo("objectId",this.props.url.query.id);
    try{
      var _todoList = await query.first();
      if(_todoList){
        var TodoItems = Parse.Object.extend("TodoItems");
        var query = new Parse.Query(TodoItems);
        query.equalTo("todoList",_todoList);
        var _items = await query.find();
        this.setState({
          isFetching:false,
          todoList:_todoList,
          items:_items
        });
      }else{
        alert("Id invalide");
      }
    }catch(error){
      alert(error.message);
    }
  }

  async _addItem(value){
    if(value.length > 0){
      var TodoItem = Parse.Object.extend("TodoItems");
      var todoItem = new TodoItem();
      todoItem.set("label", value);
      todoItem.set("isDone", false);
      todoItem.set("todoList",this.state.todoList);
      try{
        var res = await todoItem.save();
        this.setState({
          items:[ res, ...this.state.items ]
        });
      }catch(error){
        alert(error.message);
      }
    }
  }

  async _deleteItem(id){
    const idx = this.state.items.findIndex((obj)=>obj.id == id);
    const currentItem = this.state.items.find((obj)=>obj.id == id);
    try{
      await currentItem.destroy();
      this.setState({
        items: this.state.items.slice(0,idx).concat(this.state.items.slice(idx+1))
      });
    }catch(error){
      alert(error.message);
    }
  }

  async _checkItem(id){
    const idx = this.state.items.findIndex((obj)=>obj.id == id);

    const updatedItems = [...this.state.items];
    const isDone = updatedItems[idx].get("isDone");
    updatedItems[idx].set("isDone", !isDone );

    try{
      await updatedItems[idx].save();
      this.setState({
        items:updatedItems,
      });
    }catch(error){
      alert(error.message);
    }
  }

  render () {
    return(
      <Layout title='Next / Parse Todolist sample'>
        {this.renderContent()}
      </Layout>
    );
  }

  renderContent(){
    if(this.state.isFetching){
      return(
        <div style={{textAlign:'center',color:'#4ca6af'}}>
          <i className="fa fa-circle-o-notch fa-spin fa-2x"/>
        </div>
      );
    }else{
      return(
        <div>
          <h3>{this.state.todoList.get('label')}</h3>
          <AddItem addItem={(value) => this._addItem(value) } placeholder="Ajouter une tâche" />
          <TodoItems todoListItems={this.state.items}
            removeItem={(id)=>this._deleteItem(id)}
            checkItem={(id)=>this._checkItem(id)}/>
        </div>
      );
    }
  }
}
