import React from "react";
import "firebase/database";
import { AuthContext } from "../../context/Auth";
import { Container, Column, Row } from "../Container";
import ImageUpload from "./ImageUpload";
import Form from "../Form";
import Input from "../Input";
import Radiobox from "../Radiobox";
import Error from "../Error";
import { Subheading } from "../Text";
import { Gutters } from "../../styles";
import { capitalize } from "../../helpers";
import { ProfileConsumer } from "../../context/Profile";
import { choiceData } from "../../data";

const inputs = [
  {
    key: "nickName",
    label: "Display Name",
    type: "name",
  },
  {
    key: "address",
    label: "Address",
    type: "address",
  },
  {
    key: "favoriteColor",
    label: "Favorite Color",
    type: "text",
  },
];
const choicesMultiple = ["pizza", "salads", "poke"];

class Profile extends React.Component {
  render() {
    const { profileContext } = this.props;

    if (profileContext.profile === undefined) {
      return <>Loading...</>;
    }

    return (
      <Column align="unset">
        <ImageUpload
          writeUserData={profileContext.writeUserData}
          profile={profileContext.profile}
        />
        <Form
          isDisabled={profileContext.isUpdating || profileContext.isDisabled}
          submitText="Update Profile"
          onSubmit={profileContext.updateProfile}
        >
          <Subheading>Details:</Subheading>
          {inputs.map(input => (
            <Input
              key={input.key}
              onChange={e => profileContext.onChangeUserInfo([input.key], e)}
              defaultValue={
                profileContext.profile && profileContext.profile[input.key]
                  ? profileContext.profile[input.key]
                  : ""
              }
              label={input.label}
              type={input.type}
            />
          ))}

          <Container margin={`${Gutters.MEDIUM} 0 0 0`}>
            <Subheading>I Like:</Subheading>

            <Row justify="flex-start">
              {choicesMultiple.map(choice => (
                <Radiobox
                  key={choice}
                  defaultValue={
                    profileContext.profile && profileContext.profile[choice]
                  }
                  onChange={e => profileContext.onSelectChoice(choice, e)}
                  label={capitalize(choice)}
                />
              ))}
            </Row>
          </Container>

          <Container>
            {Object.entries(choiceData).map((data, index) => {
              return (
                <Container
                  margin={`${Gutters.DOUBLE_X} 0`}
                  key={`${data[0]}${index}`}
                >
                  <Subheading>{`${capitalize(data[0])}:`}</Subheading>
                  <Row justify="flex-start">
                    {data[1].map(d => (
                      <Radiobox
                        key={d}
                        value={
                          profileContext.profile &&
                          profileContext.profile[data[0]] === d
                        }
                        onChange={profileContext.onSelectPreference(d, data[0])}
                        label={capitalize(d)}
                      />
                    ))}
                  </Row>
                </Container>
              );
            })}
          </Container>
          {profileContext.error && <Error text={profileContext.error} />}
        </Form>
      </Column>
    );
  }
}

const DataProvidedProfile = React.memo(props => (
  <AuthContext.Consumer>
    {authContext => (
      <ProfileConsumer>
        {profileContext => (
          <Profile
            authContext={authContext}
            profileContext={profileContext}
            {...props}
          />
        )}
      </ProfileConsumer>
    )}
  </AuthContext.Consumer>
));

export default DataProvidedProfile;
