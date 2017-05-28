import Head from 'next/head'

export default ({ children, title = 'Titre par défault du layout' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
    </Head>

    { children }

    <style global jsx>{`
        html{
          font-family: arial;
        }
        body {
          display:flex;
          align-items:center;
          justify-content:center;
        }
        `}</style>
    </div>
  )
