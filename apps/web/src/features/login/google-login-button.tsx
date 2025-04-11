import { Config } from "@web/config/env";

// TODO : ui 패키지에서 구현
function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = `${Config.API_URL}/api/v1/auth/google`;
  };

  return (
    <button
      className="bg-blue-500 text-white p-2 rounded"
      onClick={handleLogin}
      type="button"
    >
      Google Login
    </button>
  );
}

export default GoogleLoginButton;
