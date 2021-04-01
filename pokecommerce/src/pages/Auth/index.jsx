import React, { useContext, useState } from "react";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import Page from "../../components/Page";
import axios from "../../utils/api";
import { parseJwt } from "../../utils/util";

import { toast } from "react-toastify";
import AppContext from "../../AppContext";

export default function SignIn({ history }) {
  const [isLogin, setIsLogin] = useState(true);

  const [, dispatch] = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post("/auth", form);

        localStorage.setItem("@pokemon-token", response.data.token);

        dispatch({
          type: "SET_LOGGED_USER",
          payload: parseJwt(response.data.token),
        });

        history.push("/");
      } else {
        await axios.post("/user", form);
        toast.info("User created with success");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const title = isLogin ? "Sign In" : "Sign Up";

  return (
    <Page>
      <h1 className="app-title">{isLogin ? "Login" : "Create Account"}</h1>

      <ClayForm className="mt-4" onSubmit={onSubmit}>
        {!isLogin && (
          <ClayForm.Group>
            <label>Name</label>
            <ClayInput
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
            />
          </ClayForm.Group>
        )}

        <ClayForm.Group>
          <label>Email</label>
          <ClayInput
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />
        </ClayForm.Group>
        <ClayForm.Group>
          <label>Password</label>
          <ClayInput
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
        </ClayForm.Group>

        <div className="mb-4">
          <ClayButton
            onClick={() => setIsLogin(!isLogin)}
            displayType="secondary"
          >
            {isLogin ? "Create Account" : "Login"}
          </ClayButton>
        </div>

        <ClayButton disabled={!form.password || !form.email} type="submit">
          {title}
        </ClayButton>
      </ClayForm>
    </Page>
  );
}
