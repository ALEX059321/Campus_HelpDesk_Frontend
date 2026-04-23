import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Layout and Pages
import Layout from './Layout.jsx'
import Sign_in from './pages/Sign_in.jsx'
import Create_acc from './pages/register.jsx'
import Forget_Pass from './pages/Forget_Pass.jsx'
import Hero from './pages/Hero.jsx'
import Card from './components/Card.jsx'
import Statistics from './pages/Statistics.jsx'
import Contact_us from './pages/Contact_us.jsx'
import KnowledgeBase from './pages/KnowledgeBase.jsx'


//Protected Route
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx' 
import Create_Ticket from './pages/Create_Ticket.jsx'
import MyTickets from './pages/MyTickets.jsx'
import SuggestionForm from './pages/SuggestionForm.jsx'
import ReportIncident from './pages/ReportIncident.jsx'
import HowTos from './pages/HowTos.jsx'
import ContactSupport from './pages/ContactSupport.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminRegister from './pages/AdminRegister.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Hero />} /> 
      <Route path="Sign_in" element={<Sign_in />} /> 
      <Route path="admin-login" element={<AdminLogin />} /> 
      <Route path="register" element={<Create_acc />} />
      <Route path="forget-password" element={<Forget_Pass />} />
      <Route path="Contact_us" element={<Contact_us />} />
      <Route path="Create_Ticket" element={<Create_Ticket />} />
     


      {/* ?loggedin - protected routes */}
      <Route path="dashboard" element={
        <ProtectedRoute>
          <Hero />
        </ProtectedRoute>
      } />
      
     
      <Route path="admin-dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="admin/register" element={
        <ProtectedRoute>
          <AdminRegister />
        </ProtectedRoute>
      } />
      <Route path="Statistics" element={
        <ProtectedRoute>
          <Statistics />
        </ProtectedRoute>
      } />
      
      <Route path="Knowledge" element={
        <ProtectedRoute>
          <KnowledgeBase />
        </ProtectedRoute>
      } />

      <Route path="MyTickets" element={
        <ProtectedRoute>
          <MyTickets />
        </ProtectedRoute>
      } />

      <Route path="SuggestionForm" element={
        <ProtectedRoute>
          <SuggestionForm />
        </ProtectedRoute>
      } />

      <Route path="ReportIncident" element={
        <ProtectedRoute>
          <ReportIncident />
        </ProtectedRoute>
      } />

      <Route path="HowTos" element={
        <ProtectedRoute>
          <HowTos />
        </ProtectedRoute>
      } />

      <Route path="ContactSupport" element={
        <ProtectedRoute>
          <ContactSupport />
        </ProtectedRoute>
      } />

      <Route path="Card" element={<Card />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
    
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)