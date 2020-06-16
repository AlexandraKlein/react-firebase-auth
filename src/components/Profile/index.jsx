import React from "react";
import "firebase/database";
import styled from "styled-components";
import { AuthContext } from "../../context/Auth";
import { Container, Column, Row } from "../Container";
import ImageUpload from "./ImageUpload";
import Form from "../Form";
import Input from "../Input";
import Radiobox from "../Radiobox";
import Error from "../Error";
import { Subheading, Heading } from "../Text";
import { Colors, Gutters } from "../../styles";
import { capitalize } from "../../helpers";
import { ProfileConsumer } from "../../context/Profile";
import { choiceData } from "../../data";
import Loading from "../Loading";

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
  state = {
    hasUpdated: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.profileContext.isUpdating === true &&
      this.props.profileContext.isUpdating === false
    ) {
      this.setState({ hasUpdated: true }, () =>
        setTimeout(() => this.setState({ hasUpdated: false }), 1000)
      );
    }
  }
  render() {
    const { profileContext } = this.props;

    if (profileContext.profile === undefined) {
      return <Loading />;
    }

    return (
      <Column align="unset">
        <ImageUpload
          writeUserData={profileContext.writeUserData}
          profile={profileContext.profile}
        />
        <Success
          marginTop="0px"
          marginBottom="0px"
          hasUpdated={this.state.hasUpdated}
          color={Colors.SUCCESS}
          align="center"
        >
          Success!
        </Success>
        <Form
          isDisabled={profileContext.isUpdating || profileContext.isDisabled}
          submitText="Update Profile"
          onSubmit={profileContext.updateProfile}
          buttonMarginTop="0px"
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
          <Success
            marginTop="0px"
            marginBottom="0px"
            hasUpdated={this.state.hasUpdated}
            color={Colors.SUCCESS}
            align="center"
          >
            Success!
          </Success>
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

const Success = styled(Heading)`
  transition: all 0.2s ease-out;
  overflow: hidden;
  height: ${props => (props.hasUpdated ? "60px" : 0)};
`;
