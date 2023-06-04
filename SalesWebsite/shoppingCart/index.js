window.onload = function(){
	//cart box
	const iconShopping = document.querySelector('.iconShopping');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');
	iconShopping.addEventListener("click",function(){
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click",function(){
		cartBox.classList.remove('active');
	});
    

	// adding data to localstorage
	const attToCartBtn = document.getElementsByClassName('attToCart');
	let items = [];
	for(let i=0; i<attToCartBtn.length; i++){
		attToCartBtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
						name:e.target.parentElement.children[0].textContent,
						price:e.target.parentElement.children[1].children[0].textContent,
						no:1
					};
				if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}else{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
					localStorage.setItem('items',JSON.stringify(items));
					window.location.reload();
				}
			}else{
				alert('local storage is not working on your browser');
			}
		});
	}
	// adding data to shopping cart 
	const iconShoppingP = document.querySelector('.iconShopping p');
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data=>{
		no = no+data.no
;	});
	iconShoppingP.innerHTML = no;


	//adding cartbox data in table
	const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>S no.</th><th>Item Name</th><th>item Price</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr>  <th>'+data.id+'</th><th>'+data.name+'</th>  <th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		});
	}

	cardBoxTable.innerHTML = tableData;
	cardBoxTable.innerHTML+=`<th style="color: red;">Total= ₪ ${onclick=Total()}\n</th>`;
	cardBoxTable.innerHTML+=' <th><a href="../PaymentPage/index.html">Pay Safely Here </th></a>  ';
}

function Total()
{
	let total=0;
	var products=JSON.parse(localStorage.getItem('items'));
	for(let i=0 ;i<products.length;i++)
	{
      total+=JSON.parse(products[i].price);
	  
	}
	return total;
	
}

function goToLogin()
{
 
  location.replace("../login/login.html")
}
function Delete(e){
	let items = [];
	JSON.parse(localStorage.getItem('items')).map(data=>{
		if(data.id != e.parentElement.parentElement.children[0].textContent){
			
			items.push(data);

		}
	});
	localStorage.setItem('items',JSON.stringify(items));
	window.location.reload();
};


///new
//new func
function createBook() {
	// קבלת הפרטים שהמשתמש הזין
	let title = prompt('נא להזין את שם הספר:');
	let author = prompt('נא להזין את שם המחבר:');
	let price = prompt('נא להזין את מחיר הספר:');
	let category = prompt('נא להזין את קטגוריית הספר:');
  
	// יצירת אלמנט טבלה חדש
	let table = document.querySelector('table');
	let newRow = table.insertRow(-1);
	
	// יצירת תאות הטבלה ומילוי הערכים
	let titleCell = newRow.insertCell(0);
	let authorCell = newRow.insertCell(1);
	let priceCell = newRow.insertCell(2);
	let categoryCell = newRow.insertCell(3);
  
	titleCell.textContent = title;
	authorCell.textContent = author;
	priceCell.textContent = price;
	categoryCell.textContent = category;
  }
  