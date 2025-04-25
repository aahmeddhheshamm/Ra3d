import {
  otpOptionCookiesKey,
} from "~/constants/index.js";

export default function () {

  const Unauthorized = useState('Unauthorized', () => false);
  const userCookies = useCookie("user");

  const tokenCookies = useCookie("token");

  const user = useState("userAuth", () => userCookies.value);

  const {state: otpOptionCookies} = useCookies(otpOptionCookiesKey);

  const otpOption = useState(otpOptionCookiesKey, () => otpOptionCookies.value);

  const otpCodeOption = useState("userCodeOtpOption", () => null);


  function setUserData(data, token) {
    user.value = data;
    userCookies.value = data;
    tokenCookies.value = token;

  }

  function setOtpOption(data) {
    otpOption.value = data;
    otpOptionCookies.value = data;
  }

  function setOtpCodeOption(data) {
    otpCodeOption.value = data
  }


  function removeUserData() {
    user.value = null;
    userCookies.value = null;
    tokenCookies.value = null;
    otpOption.value = null;
    otpCodeOption.value = null;

  }
  function isAuthenticated() {
    return !!tokenCookies.value
  }
  return {user,
    otpOption,
    setUserData,
    setOtpOption,
    setOtpCodeOption,
    removeUserData,
    isAuthenticated,
    tokenCookies,
    Unauthorized,
  };
}