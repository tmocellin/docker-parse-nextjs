export default ({ addItem,placeholder }) => {
  let input;

  return (
    <div className="add-itm-ctnr">

      <input ref={ el => input = el } placeholder={placeholder} type="text"/>
      <button className="btn" onClick={()=>addItem(input.value)}>Ajouter</button>

      <style global jsx>{`
          .add-itm-ctnr{
            display:flex;
            justify-content: space-between;
            min-width: 576px;
            margin-bottom:32px;
          }
          input[type="text"] {
            display: block;
            margin: 0;
            width:350px;
            font-family: sans-serif;
            font-size: 18px;
            appearance: none;
            box-shadow: none;
            border-radius: none;
            height:35px;
            padding:8px;
          }
          input[type="text"]:focus {
            outline: none;
          }
          .btn{
            background-color: #4ca6af;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            outline:0;
          }
          .btn:hover{
            cursor:pointer;
            background-color:#34777d;
          }
          `}</style>
      </div>
    )
  }
