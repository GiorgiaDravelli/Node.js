<h2> Orizon API </h2>
</br>
<p>Created with Node.js and Express, Orizon is an API application for travels.</p>
<p>Orizon allows you to create, retrieve, update and delete travel data divided in three main categories: Users, Products and Orders.</p>

<h3>How to use</h3>
<h4>Users</h4>
<ul>
    <li>Create User - POST
        <ul>
            <li>Endpoint: /api/users/</li>
            <li> Request body: Name, Surname, Email</li>
        </ul>
    </li>
    <li>Get All Users - GET
        <ul>
            <li>Endpoint: /api/users/</li>
        </ul>
    </li>
    <li>Get a User by Email - GET
        <ul>
            <li>Endpoint: /api/users/:email</li>
        </ul>
    </li>
    <li>Update User - PUT
        <ul>
            <li>Endpoint: /api/users/:email</li>
            <li> Request body: Name, Surname, Email</li>
        </ul>
    </li>
    <li>Delete User - DELETE
        <ul>
            <li>Endpoint: /api/users/:email</li>
        </ul>
    </li>
</ul>
<h4>Products</h4>
<ul>
    <li>Create Product - POST
        <ul>
            <li>Endpoint: /api/products/</li>
            <li> Request body: Name</li>
        </ul>
    </li>
    <li>Get All Products - GET
        <ul>
            <li>Endpoint: /api/products/</li>
        </ul>
    </li>
    <li>Get a Product by Name - GET
        <ul>
            <li>Endpoint: /api/products/:name</li>
        </ul>
    </li>
    <li>Update Product - PUT
        <ul>
            <li>Endpoint: /api/products/:name</li>
            <li> Request body: Name</li>
        </ul>
    </li>
    <li>Delete Product - DELETE
        <ul>
            <li>Endpoint: /api/products/:name</li>
        </ul>
    </li>
</ul>
<h4>Orders</h4>
<ul>
    <li>Create Order - POST
        <ul>
            <li>Endpoint: /api/orders/</li>
            <li> Request body: UserID, ProductID</li>
        </ul>
    </li>
    <li>Get All Orders - GET
        <ul>
            <li>Endpoint: /api/orders/</li>
        </ul>
    </li>
    <li>Get a Order by Date - GET
        <ul>
            <li>Endpoint: /api/orders/all/:date</li>
        </ul>
    </li>
    <li>Get a Order by User ID - GET
        <ul>
            <li>Endpoint: /api/orders/userId</li>
        </ul>
    </li>
    <li>Update Order - PUT
        <ul>
            <li>Endpoint: /api/orders/:id</li>
            <li> Request body: UserID, ProductID</li>
        </ul>
    </li>
    <li>Delete Order - DELETE
        <ul>
            <li>Endpoint: /api/orders/:id</li>
        </ul>
    </li>
</ul>