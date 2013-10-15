function GetData(){
	$.ajax({
		url:"http://toptotoe-boutique.com/jeapi/Category.php",
		type:'GET',
		dataType:'JSON',
		success: function(data){
			
			var items = [];
			var olevel_depth = '';
			$.each( data, function( key, val ) {
				console.log(key);
				
				if(val.level_depth == 2){
					olevel_depth = val.level_depth
					items.push( "<li class='catId' value='" + val.id + "'><a href='#main-screen' >" + val.name + " </a></li>" );
				}
			});
			
			$( "<ul/>", {
				"class": "categories",
				html: items.join( "" )
			}).appendTo( "#home" );
			
			$('ul.categories li').click(function(){ 
				GetDataAnak($(this).attr("value"),olevel_depth);
				getDataProductList($(this).attr("value"));
			});
		}
	});
}

function GetDataAnak(fPid,fLevel_depth){
	$("#main-screen").empty();
	fLevel_depth = fLevel_depth + 1

	$.ajax({
		url:"http://toptotoe-boutique.com/jeapi/Category.php",
		type:'GET',
		dataType:'JSON',
		data: (fPid == "undefined")? "" : {pid: fPid },
		success: function(data){
			
			
			var items = [];
			$.each( data, function( key, val ) {
				console.log(key);
				if(val.id != ''){
					if(val.level_depth == fLevel_depth){
						items.push( "<li id='catIds' value='" + val.id + "'><a href='#home' >" + val.name + " </a></li>" );
					}
				}
				
			});
			//alert(items)
			$("#main-screen").append(items);
		},
      error: function( xhr, status, error )
      {

         alert( error  );

      }
	});
}

function getDataProductList(fCid,fProdId){

	fCid = typeof fCid !== 'undefined' ? fCid : '';
	
	$.ajax({
		url:"http://toptotoe-boutique.com/jeapi/Product.php",
		type:'GET',
		data: {
				cid: fCid ,
				ProdId: '' 
			},
		dataType:'JSON',
		success: function(data){
			var myShopProductStyle = "css/product-list.css"

			$("<link/>", {
				rel: "stylesheet",
				type: "text/css",
				href: myShopProductStyle
			}).appendTo("head");
			
			var items = [];
			items.push("<li class='group'>Product</li>");
			$.each( data, function( key, val ) {
				console.log(key);
			
				var productImages = "<img class='product-thumb' src='" + val.id_default_image + "'>";
				var productHeading = "<p class='product-heading'>" + val.name + "</p>";
				var productShortDescription = "<span class='product-short-description'>" + val.short_description  + "</span>";
				var productPrice = "<p class='product-price'>" + val.price + "</p>";
				
				items.push( "<li class='listing' value='" + val.id + "'><a href='#product' >"+ productImages + productHeading + productShortDescription + productPrice + " </a></li>" );
			});
			
			$("#main-screen").append(items);
			$("#main-screen").css(myShopProductStyle);
				
		
			$('ul.main-screen li.listing').click(function(){ 
				getDataProductView(fCid ,$(this).attr("value"));
			});
		}
	});
}

function getDataProductView(fCid,fProdId){
	$("#product").empty();
	
	fCid = typeof fCid !== 'undefined' ? fCid : '';
	fProdId = typeof fProdId !== 'undefined' ? fProdId : '';
	
	$.ajax({
		url:"http://toptotoe-boutique.com/jeapi/Product.php",
		type:'GET',
		data: {
				cid: fCid ,
				ProdId: fProdId 
			},
		dataType:'JSON',
		success: function(data){
				
			var items = [];
			items.push("<li class='group'>Product</li>");
			$.each( data, function( key, val ) {
				console.log(key);
				var images = "<img border='0' src='" + val.id_default_image + "'>"
				items = images + val.name
			});
			
			$("#product").append(items);
			
		}
	});
}

$(function(){
	GetData();
});

