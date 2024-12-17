import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Modal, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Components
import { useAppContext } from "../utils/AppContext";
import BackButton from '../components/BackButton';

const Address = () => {
  const { backendUrl, userId } = useAppContext();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    userId,
    addressName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
      fetchDefaultAddress();
    }
  }, [backendUrl, userId]);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/address/${userId}`);
      setAddresses(data);
    } catch (err) {
      console.error("Error al obtener direcciones:", err.message);
      setAddresses([]);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/${userId}/default-address`);
      setDefaultAddress(data.defaultAddress);
    } catch (err) {
      console.error("Error al obtener la dirección predeterminada:", err.message);
    }
  };

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/address/${userId}`, newAddress);
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error("Error al guardar la dirección:", err.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${backendUrl}/api/address/${userId}/${addressId}`);
      fetchAddresses(); // Refrescar la lista de direcciones
    } catch (err) {
      console.error("Error al eliminar la dirección:", err.message);
    }
  };

  const handleSelectAddress = async (addressId) => {
    try {
      await axios.put(`${backendUrl}/api/user/${userId}/default-address`, {
        addressId,
      });
      fetchDefaultAddress();
    } catch (err) {
      console.error("Error al actualizar la dirección predeterminada:", err.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <BackButton title="Mis direcciones"/>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address._id}>
            <Card
              sx={{
                backgroundColor: address._id === defaultAddress?._id ? "#f0f8ff" : "white", // Se colorea según si es la predeterminada
                cursor: "pointer",
              }}
              onClick={() => handleSelectAddress(address._id)} // Al hacer click, selecciona esta dirección
            >
              <CardContent>
                <Typography variant="h6">{address.addressName}</Typography>
                <Typography>{`${address.street}, ${address.city}, ${address.state}`}</Typography>
                <Typography>{`${address.postalCode}, ${address.country}`}</Typography>
                <Typography>Teléfono: {address.phoneNumber}</Typography>
                <Button variant="outlined" color="primary" sx={{ marginTop: 1 }} onClick={() => handleSelectAddress(address._id)}>
                  Editar
                </Button>
                <Button variant="outlined" color="error" sx={{ marginTop: 1, marginLeft: 1 }} onClick={() => handleDeleteAddress(address._id)}>
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Card para agregar nueva dirección */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
            }}
            onClick={handleAddAddress}
          >
            <AddIcon fontSize="large" />
          </Card>
        </Grid>
      </Grid>

      {/* Modal para mostrar el formulario */}
      <Modal
        open={showForm}
        onClose={handleCloseForm}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            position: "relative", // Para posicionar la X
            width: "400px", // Limitar el tamaño del modal
            maxHeight: "80vh", // Limitar la altura máxima
            overflowY: "auto", // Permitir el desplazamiento si el contenido es largo
          }}
        >
          {/* Botón de cerrar en la esquina superior derecha */}
          <IconButton
            onClick={handleCloseForm}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Añadir nueva dirección
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre de la dirección"
              fullWidth
              variant="outlined"
              margin="normal"
              name="addressName"
              value={newAddress.addressName}
              onChange={handleInputChange}
            />
            <TextField
              label="Calle"
              fullWidth
              variant="outlined"
              margin="normal"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
            />
            <TextField
              label="Ciudad"
              fullWidth
              variant="outlined"
              margin="normal"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
            />
            <TextField
              label="Estado"
              fullWidth
              variant="outlined"
              margin="normal"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
            />
            <TextField
              label="Código postal"
              fullWidth
              variant="outlined"
              margin="normal"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleInputChange}
            />
            <TextField
              label="País"
              fullWidth
              variant="outlined"
              margin="normal"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Address;
