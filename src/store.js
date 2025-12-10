import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { coupons } from "./Coupons";
import axios from "axios";
import apiUrl from "./axiosConfig";

let cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action) => 
            {
            let item = state.find((i) => i.id===action.payload.id)
            if(item)
            {
                item.quantity+=1;
            }
            else
            {
                state.push({...action.payload,quantity:1});
            }
          },

          removeFromCart:(state, action) =>{
            let index = state.findIndex(item => item.id===action.payload.id);
            if(index!==-1){
                state.splice(index,1);
            }
          },

          incQuantity:(state, action)=> {
            let item = state.find(item => item.id===action.payload.id);
            if(item){
                item.quantity+=1;
            }
          },
          decQuantity:(state,action) => {
            let item = state.find(item => item.id===action.payload.id);
            if(item.quantity>1){
                item.quantity-=1;
            }
            else {
      // quantity = 1 → remove item using YOUR ORIGINAL LOGIC
      let index = state.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1); // ← you wanted this, kept same
      }
    }
          }
      }

});

let CouponSlice = createSlice({
  name:"coupon",
  initialState:{
    code:"",
    discount:0,
    applied:false,
    message:""
  },
  reducers:{
    applyCoupon:(state, action)=>{
      const enteredCode = action.payload.toUpperCase();
      if(enteredCode){
        state.code = enteredCode;
        state.discount=coupons[enteredCode];
        state.applied=true;
        state.message= `Coupon ${enteredCode} is applied`;
      }
      else{
        state.message="Invalid Coupon";
      }
    }
  }
})


//create thunk to handle api's

export const fetchVegProducts = createAsyncThunk(
  'veg/fetchVegProducts',
    async () => {
    const response = await apiUrl.get('/api/v1/products/getVeg');
    return response.data;

  }
)

let vegSlice = createSlice({
  name:"veg",
  initialState:{
    vegItems1:[],
    loading:false,
    error:null
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchVegProducts.fulfilled,(state,action)=>
    {
      state.vegItems1=action.payload
    }
  )
    builder.addCase(fetchVegProducts.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(fetchVegProducts.rejected,(state,action)=>
    {
      state.error= action.error.message
    }
  )

  }
})




export const fetchNonVegProducts = createAsyncThunk(
  'nonveg/fetchNonVegProducts',
    async () => {
    const response = await apiUrl.get('/api/v1/products/getNonVeg');
    return response.data;
  }
)

let nonVegSlice = createSlice({
  name:"nonveg",
  initialState:{
    nonVegItems:[],
    loading:false,
    error:null
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchNonVegProducts.fulfilled,(state,action)=>
    {
      state.nonVegItems=action.payload
    }
  )
    builder.addCase(fetchNonVegProducts.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(fetchNonVegProducts.rejected,(state,action)=>
    {
      state.error= action.error.message
    }
  )

  }
})






export const fetchDessertProducts = createAsyncThunk(
  'dessert/fetchDessertProducts',
    async () => {
    const response = await apiUrl.get('/api/v1/products/getDesserts');
    return response.data;
  }
)

let dessertSlice = createSlice({
  name:"dessert",
  initialState:{
    dessertItems:[],
    loading:false,
    error:null
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchDessertProducts.fulfilled,(state,action)=>
    {
      state.dessertItems=action.payload
    }
  )
    builder.addCase(fetchDessertProducts.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(fetchDessertProducts.rejected,(state,action)=>
    {
      state.error= action.error.message
    }
  )

  }
})





export const fetchBeverageProducts = createAsyncThunk(
  'beverage/fetchBeverageProducts',
    async () => {
    const response = await apiUrl.get('/api/v1/products/getBeverages');
    return response.data;
  }
)

let beverageSlice = createSlice({
  name:"beverage",
  initialState:{
    beverageItems:[],
    loading:false,
    error:null
  },
  extraReducers:(builder) =>{
    builder.addCase(fetchBeverageProducts.fulfilled,(state,action)=>
    {
      state.beverageItems=action.payload
    }
  )
    builder.addCase(fetchBeverageProducts.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(fetchBeverageProducts.rejected,(state,action)=>
    {
      state.error= action.error.message
    }
  )

  }
})






export const placeOrder = createAsyncThunk(
  'order/placeOrder',
    async (orderData) => {
    const response = await apiUrl.post('/api/v1/products/orders', orderData);
    return response.data;
  }
)

let orderSlice = createSlice({
  name:"order",
  initialState:{
    loading:false,
    error:null,
    successMessage:null
  },
  extraReducers:(builder) =>{
    builder.addCase(placeOrder.fulfilled,(state,action)=>
    {
      state.successMessage=action.payload.message
    }
  )
    builder.addCase(placeOrder.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(placeOrder.rejected,(state,action)=>
    {
      state.error= action.action.payload
    }
  )

  }
})






export const getOrders = createAsyncThunk(
  'order/getOrders',
    async () => {
    const response = await apiUrl.get('/api/v1/products/orders');
    return response.data;
  }
)

let getOrderSlice = createSlice({
  name:"allorders",
  initialState:{
    orders:[],
    loading:false,
    error:null,
    
  },
  extraReducers:(builder) =>{
    builder.addCase(getOrders.fulfilled,(state,action)=>
    {
      state.orders= action.payload;
    }
  )
    builder.addCase(getOrders.pending,(state,action)=>
    {
      state.loading=true
    }
  )
    builder.addCase(getOrders.rejected,(state,action)=>
    {
      state.error= action.error.message
    }
  )

  }
})





export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiUrl.post(
        "/api/v1/products/register",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    message: "",
    error: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        })

      .addCase(registerUser.fulfilled, (state, action) => {
         state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});




// export const loginUser = createAsyncThunk(
//   'login/loginUser',
//     async (loginData, { rejectWithValue }) => {
//     const response = await axios.post('http://localhost:3000/api/v1/products/login', loginData);
//     return response.data;
//   }
// )

// let loginSlice = createSlice({
//   name:"login",
//   initialState:{
//     user: null,
//     loading: false,
//     message: "",
//     error: "",
//   },
//   reducers: {},
//   extraReducers:(builder) =>{
//     builder.addCase(loginUser.fulfilled,(state,action)=>
//     {
//       state.user= action.payload;
//     }
//   )
//     builder.addCase(loginUser.pending,(state,action)=>
//     {
//       state.loading=true
//     }
//   )
//     builder.addCase(loginUser.rejected,(state,action)=>
//     {
//       state.error= action.error.message
//     }
//   );

//   },
// });









// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiUrl from "../api/apiUrl";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiUrl.post("/api/v1/products/login", formData);
      return response.data; // {success, message, token, user}
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  message: "",
  token: localStorage.getItem("token") || null,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // ✅ LOGOUT REDUCER
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.message = "";
      state.token = null;
      state.error = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = ""; // reset previous error
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          state.user = action.payload.user;
          state.message = action.payload.message;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        } else {
          state.error = action.payload.message;
          state.token = null;
          localStorage.removeItem("token");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

// ✅ EXPORT LOGOUT ACTION
export const { logout } = loginSlice.actions;

// ✅ EXPORT REDUCER
// export default loginSlice.reducer;



export const{addToCart, removeFromCart, incQuantity, decQuantity} = cartSlice.actions;
export const{applyCoupon} = CouponSlice.actions;

const store = configureStore({
    reducer:{
    
    cart:cartSlice.reducer,
    coupon:CouponSlice.reducer,
    veg: vegSlice.reducer,
    nonveg: nonVegSlice.reducer,
    dessert: dessertSlice.reducer,
    beverage: beverageSlice.reducer,
    order:orderSlice.reducer,
    allorders: getOrderSlice.reducer,
    auth: authSlice.reducer,
    login: loginSlice.reducer
  },
});
export default store;