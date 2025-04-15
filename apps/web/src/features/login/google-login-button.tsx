import { Button } from "@web/components/ui/button";
import { Config } from "@web/config/env";

// TODO : ui 패키지에서 구현
function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = `${Config.API_URL}/api/v1/auth/google`;
  };

  return <Button onClick={handleLogin}>Google Login</Button>;
}

export default GoogleLoginButton;
