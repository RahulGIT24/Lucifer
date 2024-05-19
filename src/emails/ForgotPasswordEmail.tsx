import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  interface PasswordRecoveryProps {
    username: string;
    link:string
  }
  
  export default function ForgotPasswordEmail({ username, link }: PasswordRecoveryProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Password Recovery</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Reset Your Passwowrd by clicking on the link below</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
          <Text className='font-bold'>The below link is valid for 6 minutes only.</Text> 
          </Row>
          <Row>
            <Text><a href={link}>Password Reset Link</a></Text> 
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          {/* <Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{ color: '#61dafb' }}
            >
              Verify here
            </Button>
          </Row> */}
        </Section>
      </Html>
    );
  }