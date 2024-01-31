import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    status:true,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken') || '',
    authMessage:null,
    authError:null,
    authStatus: null,
    messages:null,


    errors: {
      first_name: null,
      last_name: null,
      phone_number: null,
      country: null,
      gender: null,
      email: null,
      password: null,
      password_confirmation: null,
    },

  }),



  actions: {

    async getToken() {
      await axios.get('/sanctum/csrf-cookie').then(() => {
        // CSRF cookie has been set
      });
    },
    

    // LOGIN THE USER
    async login(data) {
    await this.getToken();
      this.isLoading = true
      try {
        const response = await axios.post('/api/login', {
          email: data.email,
          password: data.password,
        })
        this.isLoading = false
        this.refreshToken = response.data.refresh_token
        this.token = response.data.authToken
        this.user = response.data.user
        this.isAuthenticated = true
        this.authError = response.data.error
    
        localStorage.setItem('token', this.token)
    
        if (this.authError == null && this.user.role == 'admin') {
          this.router.push('/admin-dashboard')
        } else if (this.authError == null && this.user.role == 'agent' ) {
          this.router.push('/agent-dashboard')
        } else {
          this.router.push('/login')
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 2000
        })
        this.isLoading = false
      
        
      }
    },

// REGISTER Agent
    async handleRegisterAgent(data) {
      await this.getToken();
      this.authErrors = [];
      this.isLoading=true
      try {
        await axios.post("/api/register", {
          first_name:data.first_name,
          last_name:data.last_name,
          phone_number:data.phone_number,
          country:data.country,
          gender:data.gender,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        this.isLoading=false
        this.authError = null
        this.router.push("/login");
      } catch (error) {
        this.isLoading = false;
        const errorResponse = error.response.data;
      
        this.errors = {
          first_name: null,
          last_name: null,
          phone_number: null,
          country: null,
          gender: null,
          email: null,
          password: null,
          password_confirmation: null,
        }
      
        if (errorResponse.errors) {
          const errors = errorResponse.errors;
          Object.keys(errors).forEach((key) => {
            this.errors[key] = errors[key][0];
            if (key === 'password_confirmation') {
              this.errors.password_confirmation = 'The password confirmation does not match.';
            }
          });
          // check if there's an error with the profile photo upload
          if (errors.photo) {
            this.errors.profile_photo = errors.profile_photo[0];
          }
        }  
        else if (errorResponse.message && errorResponse.message.errorInfo && errorResponse.message.errorInfo.includes("Duplicate entry")) {
          this.errors.email = errorResponse.message.errorInfo[0];
        }
        else if (errorResponse.message && errorResponse.message.errorInfo && errorResponse.message.errorInfo.includes("Out of range value for column 'phone_number' ")) {
          this.errors.phone = errorResponse.message.errorInfo[0];
        }
        else {
          this.authError = 'Registration failed';
        }
      }
    },

    // LOGOUT THE USER
    async handleLogout() {
      this.authErrors = [];
      this.isLoading=true
      try {
        await axios.post("/api/logout");
        this.isAuthenticated = false
        this.isLoading=false
        this.user=null
        this.router.push("/login");
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading=false
        this.isAuthenticated = false
        this.router.push("/login");
        // localStorage.removeItem('user')
        // localStorage.removeItem('token')
        // localStorage.removeItem('refreshToken')
      }
    },
   

// FORGOT PASSWORD
    async handleForgotPassword(email) {
      this.authErrors = [];
      this.isLoading = true;
      this.getToken();
      try {
        const response = await axios.post("/api/forgot-password", {
          email: email,
        });
        this.authStatus = response.data.status;
        this.isLoading = false;
        this.router.push("/reset-password");
      } catch (error) {
        this.isLoading = false;
        this.authErrors = error.response.data.errors;
      }
    },


    // RESET PASSWORD
    async handleResetPassword(resetData) {
      this.authErrors = [];
      try {
        const response = await axios.post("/api/change-password", resetData);
        this.authStatus = response.data.status;
        this.router.push("/login");
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    
},
}
}
);