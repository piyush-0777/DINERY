import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchFoods = async () =>{
  
}


const initialState = {
     foods: [
  {
    f_name: 'Pizza Margherita',
    f_img: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 299,
    f_category: 'Fast Food',
    f_about: 'Classic Italian pizza with mozzarella cheese and tomato sauce.'
  },
  {
    f_name: 'Cheese Burger',
    f_img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 199,
    f_category: 'Fast Food',
    f_about: 'Juicy beef patty with melted cheese and soft sesame bun.'
  },
  {
    f_name: 'French Fries',
    f_img: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 99,
    f_category: 'Snacks',
    f_about: 'Crispy golden fries served with tangy ketchup.'
  },
  {
    f_name: 'Veg Sandwich',
    f_img: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 149,
    f_category: 'Snacks',
    f_about: 'Fresh vegetables and cheese layered between toasted bread.'
  },
  {
    f_name: 'Pasta Alfredo',
    f_img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 249,
    f_category: 'Italian',
    f_about: 'Creamy Alfredo pasta tossed with herbs and parmesan.'
  },
  {
    f_name: 'Chicken Biryani',
    f_img: 'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 299,
    f_category: 'Indian',
    f_about: 'Aromatic basmati rice cooked with spiced chicken and saffron.'
  },
  {
    f_name: 'Paneer Tikka',
    f_img: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 199,
    f_category: 'Indian',
    f_about: 'Grilled paneer cubes marinated in spiced yogurt.'
  },
  {
    f_name: 'Masala Dosa',
    f_img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 120,
    f_category: 'South Indian',
    f_about: 'Crispy rice crepe stuffed with spiced potato filling.'
  },
  {
    f_name: 'Idli Sambhar',
    f_img: 'https://images.pexels.com/photos/1629182/pexels-photo-1629182.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 90,
    f_category: 'South Indian',
    f_about: 'Soft steamed rice cakes served with sambhar and chutney.'
  },
  {
    f_name: 'Momos',
    f_img: 'https://images.pexels.com/photos/14703736/pexels-photo-14703736.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 120,
    f_category: 'Street Food',
    f_about: 'Steamed dumplings filled with vegetables or chicken.'
  },
  {
    f_name: 'Spring Roll',
    f_img: 'https://images.pexels.com/photos/6937469/pexels-photo-6937469.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 100,
    f_category: 'Chinese',
    f_about: 'Crispy rolls stuffed with spicy vegetables.'
  },
  {
    f_name: 'Hakka Noodles',
    f_img: 'https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 180,
    f_category: 'Chinese',
    f_about: 'Stir-fried noodles with vegetables and soy sauce.'
  },
  {
    f_name: 'Sushi Roll',
    f_img: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 350,
    f_category: 'Japanese',
    f_about: 'Fresh sushi rolls filled with rice, seaweed, and fish.'
  },
  {
    f_name: 'Tacos',
    f_img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 250,
    f_category: 'Mexican',
    f_about: 'Soft corn tortillas filled with spiced meat and veggies.'
  },
  {
    f_name: 'Hot Dog',
    f_img: 'https://images.pexels.com/photos/718739/pexels-photo-718739.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 180,
    f_category: 'Fast Food',
    f_about: 'Grilled sausage in a bun topped with mustard and ketchup.'
  },
  {
    f_name: 'Chocolate Cake',
    f_img: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 220,
    f_category: 'Dessert',
    f_about: 'Rich, moist chocolate cake with creamy frosting.'
  },
  {
    f_name: 'Ice Cream Sundae',
    f_img: 'https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 150,
    f_category: 'Dessert',
    f_about: 'Vanilla ice cream topped with chocolate syrup and nuts.'
  },
  {
    f_name: 'Falooda',
    f_img: 'https://images.pexels.com/photos/14703729/pexels-photo-14703729.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 130,
    f_category: 'Dessert',
    f_about: 'A chilled sweet drink with vermicelli, rose syrup, and ice cream.'
  },
  {
    f_name: 'Club Sandwich',
    f_img: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 170,
    f_category: 'Snacks',
    f_about: 'Triple-layered sandwich with veggies and cheese.'
  },
  {
    f_name: 'Cold Coffee',
    f_img: 'https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?auto=compress&cs=tinysrgb&w=600',
    f_price: 120,
    f_category: 'Beverage',
    f_about: 'Refreshing chilled coffee with milk and sugar.'
  }
],
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