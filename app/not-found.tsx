import { Button } from '@/components/button';

export default function NotFound() {
  return (
    <>
      <h1>Oops! We could not find the page you were looking for</h1>
      <Button href={`/`}>Go home</Button>
    </>
  );
}
