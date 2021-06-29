module.exports = {
  Logo: {
    // We're changing the LogoRenderer component
    logo: {
      // We're changing the rsg--logo-XX class name inside the component
      animation: '$blink ease-in-out 300ms infinite'
    },
    '@keyframes blink': {
      to: { opacity: 0 }
    }
  }
}