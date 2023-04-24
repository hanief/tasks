declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'next-auth' {
  interface Session {
    user_id: string
  }
}