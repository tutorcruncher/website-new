const miscellaneousRedirects = [
  {
    source: "/us",
    destination: "/",
    permanent: true,
  },
  {
    source: '/pricing',
    destination: '/pricing/gb',
    permanent: true,
  },
  {
    source: '/us/features/tutorcruncher-socket',
    destination: '/features/customization',
    permanent: true,
  },
  {
    source: '/book-a-call/sam',
    destination: '/book-a-call/1',
    permanent: true,
  },
  {
    source: '/book-a-call/daniel',
    destination: '/book-a-call/1',
    permanent: true,
  },
  {
    source: '/book-a-call/fionn',
    destination: '/book-a-call/2',
    permanent: true,
  },
  {
    source: '/help',
    destination: 'https://help.tutorcruncher.com/en/',
    permanent: true,
  },
  {
    source: '/split-payments',
    destination: '/',
    permanent: true,
  },
]

module.exports = miscellaneousRedirects;
