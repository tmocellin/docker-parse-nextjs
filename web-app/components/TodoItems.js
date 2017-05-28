export default ({ todoListItems,removeItem,checkItem }) => {


  const items = todoListItems.map((item)=>{

    const visibility = item.get('isDone') ? 'visible' : 'hidden';

    return(
      <li onClick={()=>checkItem(item.id)} key={item.id} >
        <span>
          <i className="fa fa-check" style={{visibility,color:'green',marginRight:16}}/>
          {item.get('label')}
        </span>
        <i className="fa fa-trash ic-delete" onClick={(event)=>{ event.stopPropagation(); removeItem(item.id)}}/>
      </li>
    )
  });

  return (
    <div>
      <ul className="items">
        {items}
      </ul>

      <style global jsx>{`
          .items{
            list-style-type:none;
            padding:0px;
          }
          .items li{
            width: 550px;
            height: 35px;
            display: flex;
            align-items: center;
            padding: 12px;
            border: solid 1px #d0d0d0;
            font-size: 16px;
            justify-content:space-between;
            color:#333;
          }
          .items li:hover{
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
