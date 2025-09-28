export default {
  title: 'Introduction/Welcome',
  parameters: {
    docs: {
      description: {
        component: 'Welcome to our Nuxt 3 Design System!',
      },
    },
  },
}

export const Welcome = {
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 800px;">
        <h1 style="color: #1a202c; margin-bottom: 1.5rem; font-size: 2.5rem; font-weight: bold;">Design System</h1>

        <p style="color: #4a5568; margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.75;">
          Welcome to our Nuxt 3 Design System!
        </p>

        <h2 style="color: #2d3748; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 600;">Features</h2>

        <ul style="color: #4a5568; margin-bottom: 2rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;"><strong>Design Tokens</strong>: Colors and typography</li>
          <li style="margin-bottom: 0.5rem;"><strong>Components</strong>: Reusable UI components</li>
          <li style="margin-bottom: 0.5rem;"><strong>Layout</strong>: Header, main, and footer components</li>
        </ul>

        <h2 style="color: #2d3748; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 600;">Getting Started</h2>

        <p style="color: #4a5568; margin-bottom: 2rem; line-height: 1.75;">
          Explore the sidebar to see all available components and design tokens.
        </p>

        <h2 style="color: #2d3748; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 600;">Built With</h2>

        <ul style="color: #4a5568; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">Nuxt 3</li>
          <li style="margin-bottom: 0.5rem;">Vue 3</li>
          <li style="margin-bottom: 0.5rem;">Tailwind CSS</li>
          <li style="margin-bottom: 0.5rem;">Storybook 9</li>
        </ul>
      </div>
    `,
  }),
}
