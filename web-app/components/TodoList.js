export default ({ todolist,deleteTodolist,showTodoList }) => {

  const items = todolist.map((item)=>(
    <li key={item.id} onClick={()=>showTodoList(item.id)}>
        <span>{item.get('label')}</span>
        <i className="fa fa-trash ic-delete" onClick={(event)=>{event.stopPropagation(); deleteTodolist(item.id)}}/>
    </li>
  ));

  return (
    <div>
      <ul className="todolist">
        {items}
      </ul>

      <style global jsx>{`
          .todolist{
            list-style-type:none;
            padding:0px;
          }
          .todolist li{
            width: 550px;
            height: 50px;
            display: flex;
            align-items: center;
            padding: 12px;
            border: solid 1px #d0d0d0;
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 12px;
            border-radius:2px;
            justify-content:space-between;
            color:#333;
            -moz-box-shadow: 4px 6px 8px 0px #c0c0c0;
            -webkit-box-shadow: 4px 6px 8px 0px #c0c0c0;
            -o-box-shadow: 4px 6px 8px 0px #c0c0c0;
            box-shadow: 4px 6px 8px 0px #c0c0c0;
          }
          .todolist li:hover{
            -moz-box-shadow: 2px 4px 8px 0px #c0c0c0;
            -webkit-box-shadow: 2px 4px 8px 0px #c0c0c0;
            -o-box-shadow: 2px 4px 8px 0px #c0c0c0;
            box-shadow: 2px 4px 8px 0px #c0c0c0;
            cursor:pointer;
          }
          .ic-delete{
            color:#d0d0d0;
          }
          .ic-delete:hover{
            color:red;
          }
          `}</style>

      </div>
    )
  }
