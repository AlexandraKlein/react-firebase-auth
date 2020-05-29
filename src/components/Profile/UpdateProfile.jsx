import React from "react";
import { AuthContext } from "../../Auth";
import Form from "../Form";
import Input from "../Input";
import Error from "../Error";

const UpdateProfile = () => {
  const { currentUser } = React.useContext(AuthContext);
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
    <>
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
    </>
  );
};

export default UpdateProfile;
