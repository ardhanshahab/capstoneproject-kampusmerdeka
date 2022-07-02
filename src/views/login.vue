<template>
  <div id="app">
    <h1>Vue JWT Client</h1>
    <form v-on:submit.prevent="onSubmit">
      <input type="email" name="email" v-model="email">
      <input type="password" name="password" v-model="password">
      <input type="submit" name="submit" value="Login">
    <button v-on:click="getUser()" >Get user</button>
    </form>
    
  </div>
</template>
<script>

import axios from 'axios'
export default {
  name: 'loginPage',
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods: {
  onSubmit(){
      axios.post('https://go-hospital-server.herokuapp.com/api/login', {
            email: this.email,
            password: this.password
          })
          .then(response=>{
            this.$cookie.set('token',response.data.jwt.access_token);
            this.$localStorage.set('token', response.data.jwt.access_token)
          })
          .catch(err=>{
            console.log(err);
          });
  },
  getUser(){
      axios.get('https://go-hospital-server.herokuapp.com/api/user', {
           headers:{'Authorization': 'Bearer ' + this.$localStorage.get('token'),
                    "Access-Control-Allow-Origin" : "*",
                    "Content-type": "Application/json",
                    "Access-Control-Allow-Credentials": "true",},
                    
           
           })
          .then(res=>{
            console.log(res)
            this.$localStorage.get('token')
            console.log(this.$localStorage.get('token'))
          })
          .catch(err=>{
            console.log('error', err);
          });

      axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);
    }
  
  }
}
</script>