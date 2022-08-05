import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { IContact } from "../interfaces/contact";

interface ContactProps {
  contact: IContact;
  edit: (contact: IContact) => void;
  drop: (contact: IContact) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, edit, drop }) => {
  return (
    <Card key={contact.id} sx={{ border: "1px dashed gray" }}>
      <CardContent>
        <Grid
          container
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item mt={1}>
            <Grid container>
              <Box p={1}>
                <ContactPhoneSharpIcon />
              </Box>
              <Typography variant={"overline"} p={1} color={"CaptionText"}>
                {contact.name}
              </Typography>
              <Box p={1}>
                <PhoneSharpIcon color={"success"} />
              </Box>

              <Typography p={1} variant={"subtitle1"} color={"ActiveBorder"}>
                {contact.phone}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <IconButton onClick={() => edit(contact)}>
                <ModeEditIcon />
              </IconButton>
              <IconButton onClick={() => drop(contact)}>
                <DeleteIcon color={"error"} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Contact;
