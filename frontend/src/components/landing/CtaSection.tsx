import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function CtaSection({ signupPath }: { signupPath: string }) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <Paper variant="outlined" sx={{ bgcolor: "grey.100", borderRadius: 3, p: { xs: 3, md: 6 }, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
            Ready to simplify your links?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: "auto", mb: 3 }}>
            Create your free Linkly account and start managing your short URLs in seconds.
          </Typography>
          <Button
            component={RouterLink}
            to={signupPath}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{ textTransform: "none", px: 3, py: 1.25 }}
          >
            Get Started — It’s Free
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
