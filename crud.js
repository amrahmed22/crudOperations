var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDescription = document.getElementById("ProductDescription");
var productContainer;
var currentIndex = 0;
if (localStorage.getItem("all") != null) {
    productContainer = JSON.parse(localStorage.getItem("all"));
    displayData(productContainer)
}
else {
    productContainer = [];
}
function addProduct() {
   if (productNameValidation()==true && productPriceValidation()==true&&productCategoryValidation()==true &&productDescValidation()==true) {
    product = {
        name: ProductName.value,
        price: ProductPrice.value,
        category: ProductCategory.value,
        desc: ProductDescription.value
    }
    productContainer.push(product);
    clearData();
    localStorage.setItem("all", JSON.stringify(productContainer))
    displayData(productContainer);
   }

}
function displayData(list) {
    var temp = ''
    for (let i = 0; i < list.length; i++) {
        temp += `        <tr>
        <td>${i}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button class="btn btn-warning"onclick="updateProduct(${i})">update</button></td>
        <td><button class="btn btn-danger"onclick="deleteProduct(${i})">delete</button></td>
    </tr>`

    }
    document.getElementById("table").innerHTML = temp;
}


function deleteProduct(i) {
    // alert(i);
    productContainer.splice(i, 1);
    localStorage.setItem("all", JSON.stringify(productContainer))
    displayData(productContainer);
}

function clearData() {
    ProductName.value = '';
    ProductPrice.value = '';
    ProductCategory.value = '';
    ProductDescription.value = '';
    document.getElementById("add").classList.replace("d-none", "d-inline-block")
    document.getElementById("update").classList.replace("d-inline-block", "d-none")
    ProductName.classList.remove('is-valid','is-invalid');
    ProductPrice.classList.remove('is-valid','is-invalid');
    ProductCategory.classList.remove('is-valid','is-invalid');
    ProductDescription.classList.remove('is-valid','is-invalid');
}

function updateProduct(i) {
    document.getElementById("update").classList.replace("d-none", "d-inline-block")
    document.getElementById("add").classList.replace("d-inline-block", "d-none")
    ProductName.value = productContainer[i].name;
    ProductPrice.value = productContainer[i].price;
    ProductCategory.value = productContainer[i].category;
    ProductDescription.value = productContainer[i].desc;
    currentIndex = i;

}

function updatedProducts() {
    if (productNameValidation()==true && productPriceValidation()==true&&productCategoryValidation()==true &&productDescValidation()==true) {

    productContainer[currentIndex].name = ProductName.value;
    productContainer[currentIndex].price = ProductPrice.value;
    productContainer[currentIndex].category = ProductCategory.value;
    productContainer[currentIndex].desc = ProductDescription.value;
    clearData();
    localStorage.setItem("all", JSON.stringify(productContainer))
    displayData(productContainer);
    document.getElementById("update").classList.replace('d-inline-block', 'd-none')
    document.getElementById("add").classList.replace('d-none', 'd-inline-block')}
   

}

function search(key) {
    var searchContainer = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toUpperCase().includes(key.toUpperCase()) || productContainer[i].category.toUpperCase().includes(key.toUpperCase()) || productContainer[i].price.toUpperCase().includes(key.toUpperCase()) || productContainer[i].desc.toUpperCase().includes(key.toUpperCase())) {

            searchContainer.push(productContainer[i])
        }
        displayData(searchContainer);
    }
}


function productNameValidation() {
    var regx=/^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/;

  if(regx.test(ProductName.value)==true)
  {
    if(ProductName.classList.contains('is-invalid'))
    {
        ProductName.classList.replace('is-invalid','is-valid');
    }
    else
    {
        ProductName.classList.add('is-valid');
    }
    return true;
  }
  else
  {
    if(ProductName.classList.contains('is-valid'))
    {
        ProductName.classList.replace('is-valid','is-invalid');
    }
    else
    {
        ProductName.classList.add('is-invalid');
    }
    return false;
  }
}

function productPriceValidation() {
    var regx=/^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/g;

  if(regx.test(ProductPrice.value)==true)
  {
    if(ProductPrice.classList.contains('is-invalid'))
    {
        ProductPrice.classList.replace('is-invalid','is-valid');
    }
    else
    {
        ProductPrice.classList.add('is-valid');
    }
    return true;
  }
  else
  {
    if(ProductPrice.classList.contains('is-valid'))
    {
        ProductPrice.classList.replace('is-valid','is-invalid');
    }
    else
    {
        ProductPrice.classList.add('is-invalid');
    }
    return false;
  }
}
function productCategoryValidation() {
    var regx = /^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/gi;
    if (regx.test(ProductCategory.value)==true) {
        if(ProductCategory.classList.contains('is-invalid'))
        {
            ProductCategory.classList.replace("is-invalid","is-valid")
        }
        else
        {
            ProductCategory.classList.add("is-valid")
        }
        return true;
    }
    else
    {
        if (ProductCategory.classList.contains("is-valid")) {
            ProductCategory.classList.replace("is-valid","is-invalid");
        }
        else
        {
            ProductCategory.classList.add("is-invalid");
        }
        return false;
    }
}

function productDescValidation() {
    var regx =/^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/gi  ;
    if (regx.test(ProductDescription.value)==true) {
        if(ProductDescription.classList.contains("is-invalid"))
        {
            ProductDescription.classList.replace("is-invalid","is-valid")
        }
        else
        {
            ProductDescription.classList.add("is-valid")
        }

        return true;
    }
    else
    {
        if(ProductDescription.classList.contains("is-valid"))
        {
            ProductDescription.classList.replace("is-valid","is-invalid")
        }
        else
        {
            ProductDescription.classList.add("is-invalid")
        }
        return false;
    }
}

