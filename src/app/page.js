import Button from "@mui/material/Button";

//Componenets:
import { LoginButton } from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>LogIn/SignUp Page</h1>
      <LoginButton>
        <Button variant="contained" sx={{ color: `primary.contrastText` }}>
          Sign In
        </Button>
      </LoginButton>
    </div>
  );
}
