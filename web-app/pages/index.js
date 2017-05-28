import React from 'react'
import Router from 'next/router';
import Parse from 'parse';

import Layout from '../components/Layout';
import AddItem from '../components/AddItem';
import TodoList from '../components/TodoList';

import {PARSE_APP_ID,PARSE_SERVER_URL} from '../config.js';

export default class extends React.Component {

  constructor(){
    super();
    this.state = {
      todoLists : [],
      isFetching:true,
    }
    Parse.initialize(PARSE_APP_ID);
    Parse.serverURL = PARSE_SERVER_URL;
  }


  async componentDidMount() {
    var TodoList = Parse.Object.extend("TodoList");
    var query = new Parse.Query(TodoList);
    query.descending("createdAt");
    try{
      var data = await query.find();
      this.setState({
        isFetching:false,
        todoLists:data
      });
    }catch(error){
      alert(error.message);
      this.setState({
        isFetching:false,
      });
    }
  }

  async _showTodoList(id){
    Router.push({
      pathname: '/todolist',
      query: { id: id }
    })
  }

  async _addTodoList(value){
    if(value.length > 0){
      var TodoList = Parse.Object.extend("TodoList");
      var todoList = new TodoList();
      todoList.set("label", value);

      try{
        var res = await todoList.save();
        this.setState({
          todoLists:[ res, ...this.state.todoLists ]
        });
      }catch(error){
        alert(error.message);
      }
    }
  }

  async _deleteTodoList(id){
    const idx = this.state.todoLists.findIndex((obj)=>obj.id == id);
    const currentTodoList = this.state.todoLists.find((obj)=>obj.id == id);
    try{
      await currentTodoList.destroy();
      this.setState({
        todoLists: this.state.todoLists.slice(0,idx).concat(this.state.todoLists.slice(idx+1))
      });
    }catch(error){
      alert(error.message);
    }
  }

  render () {
    return(
      <Layout title='Next / Parse Todolist sample'>
        <h1>Next JS TodoList</h1>
        <AddItem addItem={(value)=>this._addTodoList(value)} placeholder="Ajouter une nouvelle liste"/>
        {this.renderContent()}
      </Layout>
    );
  }

  renderContent(){
    if(this.state.isFetching){
      return (
        <div style={{textAlign:'center',color:'#4ca6af'}}>
          <i className="fa fa-circle-o-notch fa-spin fa-2x"/>
        </div>);
      }else{
        return(<TodoList todolist={this.state.todoLists}
          showTodoList={(id)=>this._showTodoList(id)}
          deleteTodolist={(id)=> this._deleteTodoList(id)}/>);
        }
      }
    }
