import React from "react";
import { AuthContext } from "../../context/Auth";
import Form from "../Form";
import Input from "../Input";
import Error from "../Error";
import { Subheading } from "../Text";

const UpdateProfile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState(undefined);
  const [name, setName] = React.useState(currentUser.displayName || undefined);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const updateName = async event => {
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
  };

  const onTypeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim());
  };

  return (
    <>
      <Subheading align="center">
        Hello, {currentUser.displayName || "Friend"}
      </Subheading>

      <Form
        isDisabled={isUpdating || name === currentUser.displayName}
        submitText="Update Profile Name"
        onSubmit={updateName}
      >
        <Input
          onChange={onTypeName}
          defaultValue={currentUser.displayName || undefined}
          label="Display Name"
          type="name"
        />
        {error && <Error text={error} />}
      </Form>
    </>
  );
};

export default UpdateProfile;
