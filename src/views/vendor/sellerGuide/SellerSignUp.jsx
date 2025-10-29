import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Container,
  MenuItem,
  Link,
} from "@mui/material";
import api from '../../../api/api'

import Grid from '@mui/material/Grid2'
import BusinessInformation from "./parts/BusinessInfo";
import PaymentMethodForm from "./parts/PaymentMethodForm";
import BusinessInformationForm from "./parts/BusinessInformationForm";
import ProfileSetupForm from "./parts/ProfileForm";
import axios from "axios";
import Swal from "sweetalert2";


const countryOptions = [
  { label: "Ghana", value: "GH" },
  // Add more countries here...
];


const steps = [
  // "Account Details",
  "Business Information",
  "Profile Setup",
  "Payment Information",
  "Complete"
];

const SellerSignUpPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const API_KEY = 'pk.ac7f55c6c458a12ea5ed586db0b1bb4d'; 


    const [formData, setFormData] = useState({
        storeName: "",
        businessEmail: "",
        businessAddress: "",
        latitude: "",
        longitude: "",
        phoneNumber: "",
        taxID: "",
        paymentMethod: "momo",
        momoNumber: "",
        momoProvider: "",
        bankName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankRoutingNumber: "",
        profilePicture: "",
        coverImage: "",
        about: "",
        country: "",
        businessType: "sole_proprietor",
        vendorType: "student",
        license: null, // For non-students
        studentId: null, // For students
      });
      
    const [errors, setErrors] = useState({});

    const handleNext = () => {
      // Validate the current step before moving to the next one
      if (validateStep(activeStep)) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to next step
      } else {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill all required fields before proceeding.",
        });
      }
    };
    
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1); // Move to previous step
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    // Append non-file fields
    for (const key in formData) {
      if (
        formData[key] &&
        typeof formData[key] !== "object" && // Skip objects like files
        key !== "profilePicture" &&
        key !== "coverImage" &&
        key !== "license" &&
        key !== "studentId"
      ) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append file fields
    if (formData.profilePicture instanceof File) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
    if (formData.coverImage instanceof File) {
      formDataToSend.append("coverImage", formData.coverImage);
    }
    if (formData.license instanceof File) {
      formDataToSend.append("license", formData.license);
    }
    if (formData.studentId instanceof File) {
      formDataToSend.append("studentId", formData.studentId);
    }

    try {
      const response = await api.post("/vendor/register/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Vendor registered successfully!",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Unexpected Response",
          text: "Unexpected response during registration. Please check your inputs.",
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data?.error || "Registration failed. Please try again.",
          footer: error.response.data?.details
            ? `<small>Details: ${JSON.stringify(error.response.data.details)}</small>`
            : "",
        });
      } else if (error.request) {
        console.error("Request error:", error.request);
        Swal.fire({
          icon: "error",
          title: "No Response",
          text: "No response from the server. Please try again.",
        });
      } else {
        console.error("Error setting up the request:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while setting up the request. Please try again.",
        });
      }
    }
  };

    

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (file && file.size > 2 * 1024 * 1024) { // Limit file size to 2MB
      Swal.fire({
        icon: 'error',
        title: 'File size exceeds 2MB!',
        text: 'Please upload a file that is 2MB or smaller.',
      });
      return;
    }
  
    if (file && !["application/pdf", "image/png"].includes(file.type)) { // Limit file types
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type!',
        text: 'Only PDF and PNG files are allowed.',
      });
      return;
    }
  
    setFormData({ ...formData, [name]: file });
  };

  const handleChangeInput = async (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessAddress: value, // Replace with the actual value
    }));

    if (value.length > 2) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: API_KEY,
          q: query,
          format: 'json',
        },
      });
      console.log(response.data)
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessAddress: suggestion.display_name, // Replace with the actual value
      longitude: suggestion.lon, // Replace with the actual value
      latitude: suggestion.lat, // Replace with the actual value
    }));
    setSuggestions([]); // Clear suggestions after selection
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Business Information Form validation
        if (!formData.storeName) newErrors.storeName = "Store Name is required";
        if (!formData.businessEmail) newErrors.businessEmail = "Email is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.vendorType) newErrors.vendorType = "Vendor type is required";
        if (formData.vendorType === 'student' && !formData.studentId) {
          newErrors.studentId= "File is required is required";
        } 
        if (formData.vendorType === 'non_student' && !formData.license) {
          newErrors.license = "Licence is required";
        } 

        break;

      case 1: // Profile Setup Form validation
        if (!formData.profilePicture) newErrors.profilePicture = "Profile Picture is required";
        if (!formData.coverImage) newErrors.coverImage = "Cover Image is required";
        if (!formData.businessAddress) newErrors.businessAddress = "Business Address is required";
        break;

      case 2: // Payment Method Form validation
        if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required";
        if (formData.paymentMethod === "momo" && !formData.momoNumber) {
          newErrors.momoNumber = "Mobile Money Number is required";
        }
        if (formData.paymentMethod === "momo" && !formData.momoProvider) {
          newErrors.momoProvider = "Mobile Money provider is required eg. MTN, GLO";
        }
        if (formData.paymentMethod === "bank" && !formData.bankAccountNumber) {
          newErrors.bankAccountNumber = "Bank Account Number is required";
        }
        if (formData.paymentMethod === "bank" && !formData.bankName) {
          newErrors.bankName = "Bank Account Name is required";
        }
        if (formData.paymentMethod === "bank" && !formData.bankAccountName) {
          newErrors.bankAccountName = "Bank Account Name is required";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors); // Update error state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const renderStepContent = (step) => {

    switch (step) {
        // case 0:
        //   return (
        //     <BusinessInformation
        //         formData={formData} // Pass the current form data
        //         handleInputChange={handleInputChange} // Pass the function to handle input changes
        //     />
        //   );
        case 0:
          return (
            <BusinessInformationForm
                formData={formData} // Pass the current form data
                handleInputChange={handleInputChange} // Pass the function to handle input changes
                handleFileChange={handleFileChange}
                countryOptions={countryOptions}
                errors={errors}
            />
          );
        case 1:
          return (
            <ProfileSetupForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleImageChange={handleImageChange}
              errors={errors}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
              handleChangeInput={handleChangeInput}
            />
          );

        case 2:
          return (
            <PaymentMethodForm
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
            />
          );
        case 3:
          return (
            <Box textAlign="center">
              <Typography variant="h6" sx={{ mb: 4 }}>
                You’re All Set!
              </Typography>
              <Typography sx={{ mb: 4 }}>
                Thank you for signing up! You can now access your seller dashboard to
                list products and manage orders.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Redirecting to Dashboard...")}
              >
                Go to Dashboard
              </Button>
            </Box>
          );
        default:
          return <Typography>Error! Unknown Step.</Typography>;
      }      

  }

  return (
    <Container maxWidth="sm" sx={{
        py: 6 ,
        backgroundColor: "#f5faff",
        }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
      >
        Seller Sign-Up
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form Content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 0 }}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Finish
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={false} // You can add validation logic here
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>

      {/* Footer */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Log in here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SellerSignUpPage;
