import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchFoods = async () =>{
  
}


const initialState = {
     foods:[
  {
    _id: 1,
    name: 'Pizza Margherita',
    foodImg: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 299,
    category: 'Fast Food',
    description: 'Classic Italian pizza with mozzarella cheese and tomato sauce.',
    isAvailable: true
  },
  {
    _id: 2,
    name: 'Cheese Burger',
    foodImg: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 199,
    category: 'Fast Food',
    description: 'Juicy beef patty with melted cheese and soft sesame bun.',
    isAvailable: true
  },
  {
    _id: 3,
    name: 'French Fries',
    foodImg: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 99,
    category: 'Snacks',
    description: 'Crispy golden fries served with tangy ketchup.',
    isAvailable: true
  },
  {
    _id: 4,
    name: 'Veg Sandwich',
    foodImg: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 149,
    category: 'Snacks',
    description: 'Fresh vegetables and cheese layered between toasted bread.',
    isAvailable: true
  },
  {
    _id: 5,
    name: 'Pasta Alfredo',
    foodImg: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 249,
    category: 'Italian',
    description: 'Creamy Alfredo pasta tossed with herbs and parmesan.',
    isAvailable: true
  },
  {
    _id: 6,
    name: 'Chicken Biryani',
    foodImg: 'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 299,
    category: 'Indian',
    description: 'Aromatic basmati rice cooked with spiced chicken and saffron.',
    isAvailable: true
  },
  {
    _id: 7,
    name: 'Paneer Tikka',
    foodImg: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 199,
    category: 'Indian',
    description: 'Grilled paneer cubes marinated in spiced yogurt.',
    isAvailable: true
  },
  {
    _id: 8,
    name: 'Masala Dosa',
    foodImg: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 120,
    category: 'South Indian',
    description: 'Crispy rice crepe stuffed with spiced potato filling.',
    isAvailable: true
  },
  {
    _id: 9,
    name: 'Idli Sambhar',
    foodImg: 'https://images.pexels.com/photos/1629182/pexels-photo-1629182.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 90,
    category: 'South Indian',
    description: 'Soft steamed rice cakes served with sambhar and chutney.',
    isAvailable: true
  },
  {
    _id: 10,
    name: 'Momos',
    foodImg: 'https://images.pexels.com/photos/14703736/pexels-photo-14703736.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 120,
    category: 'Street Food',
    description: 'Steamed dumplings filled with vegetables or chicken.',
    isAvailable: true
  },
  {
    _id: 11,
    name: 'Spring Roll',
    foodImg: 'https://images.pexels.com/photos/6937469/pexels-photo-6937469.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 100,
    category: 'Chinese',
    description: 'Crispy rolls stuffed with spicy vegetables.',
    isAvailable: true
  },
  {
    _id: 12,
    name: 'Hakka Noodles',
    foodImg: 'https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 180,
    category: 'Chinese',
    description: 'Stir-fried noodles with vegetables and soy sauce.',
    isAvailable: true
  },
  {
    _id: 13,
    name: 'Sushi Roll',
    foodImg: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 350,
    category: 'Japanese',
    description: 'Fresh sushi rolls filled with rice, seaweed, and fish.',
    isAvailable: true
  },
  {
    _id: 14,
    name: 'Tacos',
    foodImg: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 250,
    category: 'Mexican',
    description: 'Soft corn tortillas filled with spiced meat and veggies.',
    isAvailable: true
  },
  {
    _id: 15,
    name: 'Hot Dog',
    foodImg: 'https://images.pexels.com/photos/718739/pexels-photo-718739.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 180,
    category: 'Fast Food',
    description: 'Grilled sausage in a bun topped with mustard and ketchup.',
    isAvailable: true
  },
  {
    _id: 16,
    name: 'Chocolate Cake',
    foodImg: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 220,
    category: 'Dessert',
    description: 'Rich, moist chocolate cake with creamy frosting.',
    isAvailable: true
  },
  {
    _id: 17,
    name: 'Ice Cream Sundae',
    foodImg: 'https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 150,
    category: 'Dessert',
    description: 'Vanilla ice cream topped with chocolate syrup and nuts.',
    isAvailable: true
  },
  {
    _id: 18,
    name: 'Falooda',
    foodImg: 'https://images.pexels.com/photos/14703729/pexels-photo-14703729.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 130,
    category: 'Dessert',
    description: 'A chilled sweet drink with vermicelli, rose syrup, and ice cream.',
    isAvailable: true
  },
  {
    _id: 19,
    name: 'Club Sandwich',
    foodImg: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 170,
    category: 'Snacks',
    description: 'Triple-layered sandwich with veggies and cheese.',
    isAvailable: true
  },
  {
    _id: 20,
    name: 'Cold Coffee',
    foodImg: 'https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 120,
    category: 'Beverage',
    description: 'Refreshing chilled coffee with milk and sugar.',
    isAvailable: true
  }
] ,

 category: [
  {
    _id: 1,
    c_name: 'All',
    c_img: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 2,
    c_name: 'Fast Food',
    c_img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 3,
    c_name: 'Snacks',
    c_img: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 4,
    c_name: 'Italian',
    c_img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 5,
    c_name: 'Indian',
    c_img: 'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 6,
    c_name: 'South Indian',
    c_img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 7,
    c_name: 'Street Food',
    c_img: 'https://images.pexels.com/photos/14703736/pexels-photo-14703736.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 8,
    c_name: 'Chinese',
    c_img: 'https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 9,
    c_name: 'Japanese',
    c_img: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 10,
    c_name: 'Mexican',
    c_img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 11,
    c_name: 'Dessert',
    c_img: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    _id: 12,
    c_name: 'Beverage',
    c_img: 'https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]


 
}

export const foodSlice = createSlice({
    name:'food',
    initialState,
    reducers:{

    }
})

export default foodSlice.reducer;