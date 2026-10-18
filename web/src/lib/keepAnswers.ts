import { startTransition, type FormEvent } from "react";

/**
 * Submits a form without React clearing it afterwards.
 *
 * A function passed to <form action> makes React reset every uncontrolled
 * field once the action settles — on success, but also when the server
 * answers "please fix the errors below" or fails to save. The person who
 * filled in twenty fields and chose a photo then gets an error and an empty
 * form, and the photo button still names a file the input no longer holds.
 *
 * Passed as onSubmit, this sends the same FormData through the same action,
 * and React leaves the form alone: it only resets when it ran the action
 * itself. Keep action={formAction} on the form as well — that is what still
 * submits it before the JavaScript has loaded.
 */
export function keepAnswers(formAction: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };
}
