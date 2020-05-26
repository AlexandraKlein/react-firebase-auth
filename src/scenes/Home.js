import React, { useContext } from "react";
import app from "../base";
import { AuthContext } from "../Auth";
import Container from "../components/Container";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import Error from "../components/Error";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [error, setError] = React.useState(undefined);
  const [name, setName] = React.useState(currentUser.displayName || undefined);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const updateName = React.useCallback(
    async event => {
      event.preventDefault();
      const { name } = event.target.elements;
      try {
        await currentUser
          .updateProfile({ displayName: name.value })
          .then(() => {
            setIsUpdating(true);
            setName(currentUser.displayName);
          })
          .finally(() => setIsUpdating(false));
      } catch (error) {
        setError(error.message);
        setIsUpdating(false);
      }
    },
    [currentUser]
  );

  const onChange = event => {
    setName(event.target.value.trim());
  };

  return (
    <Container>
      <h1>Home</h1>
      <p>Hello, {currentUser.displayName || "Friend"}</p>

      <Form
        isDisabled={isUpdating || name === currentUser.displayName}
        submitText="Update Profile Name"
        onSubmit={updateName}
      >
        <Input
          onChange={onChange}
          defaultValue={currentUser.displayName || undefined}
          label="Full Name"
          type="name"
          placeholder="name"
        />
      </Form>

      {error && <Error text={error} />}

      <Button
        secondary={true}
        text="Sign out"
        onClick={() => app.auth().signOut()}
      />
    </Container>
  );
};

export default Home;
