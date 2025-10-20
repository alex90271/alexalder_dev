<script>
  import { onMount } from 'svelte';
  import feather from 'feather-icons';

  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let isLoading = false;
  let showSuccess = false;
  let showError = false;
  let errorMessage = '';
  let formErrors = {};

  onMount(() => {
    feather.replace();
  });

  function validateForm() {
    formErrors = {};
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      formErrors.name = 'Name is required';
      isValid = false;
    } else if (name.trim().length < 2) {
      formErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Subject validation
    if (!subject.trim()) {
      formErrors.subject = 'Subject is required';
      isValid = false;
    } else if (subject.trim().length < 3) {
      formErrors.subject = 'Subject must be at least 3 characters';
      isValid = false;
    }

    // Message validation
    if (!message.trim()) {
      formErrors.message = 'Message is required';
      isValid = false;
    } else if (message.trim().length < 10) {
      formErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset states
    showSuccess = false;
    showError = false;
    errorMessage = '';

    // Validate form
    if (!validateForm()) {
      return;
    }

    isLoading = true;

    try {
      // For now, we'll make a direct API call. In production, you should
      // route this through your backend or a serverless function to keep API keys secure
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess = true;
        // Reset form
        name = '';
        email = '';
        subject = '';
        message = '';
        formErrors = {};

        // Hide success message after 5 seconds
        setTimeout(() => {
          showSuccess = false;
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      showError = true;
      errorMessage = error.message || 'Something went wrong. Please try again.';

      // Hide error message after 5 seconds
      setTimeout(() => {
        showError = false;
      }, 5000);
    } finally {
      isLoading = false;
    }
  }

  function clearError(field) {
    formErrors[field] = '';
    formErrors = formErrors;
  }
</script>

<div class="contact-form-container">
  <div class="form-header">
    <h3 class="form-title">Send us a message</h3>
    <p class="form-subtitle">We'll get back to you as soon as possible</p>
  </div>

  <form on:submit={handleSubmit} class="contact-form">
    <div class="form-row">
      <div class="form-group">
        <label for="name" class="form-label">
          Name <span class="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          bind:value={name}
          on:focus={() => clearError('name')}
          class="form-input"
          class:error={formErrors.name}
          disabled={isLoading}
          placeholder="John Doe"
        />
        {#if formErrors.name}
          <span class="error-message">{formErrors.name}</span>
        {/if}
      </div>

      <div class="form-group">
        <label for="email" class="form-label">
          Email <span class="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          bind:value={email}
          on:focus={() => clearError('email')}
          class="form-input"
          class:error={formErrors.email}
          disabled={isLoading}
          placeholder="john@example.com"
        />
        {#if formErrors.email}
          <span class="error-message">{formErrors.email}</span>
        {/if}
      </div>
    </div>

    <div class="form-group">
      <label for="subject" class="form-label">
        Subject <span class="required">*</span>
      </label>
      <input
        type="text"
        id="subject"
        bind:value={subject}
        on:focus={() => clearError('subject')}
        class="form-input"
        class:error={formErrors.subject}
        disabled={isLoading}
        placeholder="Project inquiry"
      />
      {#if formErrors.subject}
        <span class="error-message">{formErrors.subject}</span>
      {/if}
    </div>

    <div class="form-group">
      <label for="message" class="form-label">
        Message <span class="required">*</span>
      </label>
      <textarea
        id="message"
        bind:value={message}
        on:focus={() => clearError('message')}
        class="form-input form-textarea"
        class:error={formErrors.message}
        disabled={isLoading}
        rows="5"
        placeholder="Tell us about your project..."
      ></textarea>
      {#if formErrors.message}
        <span class="error-message">{formErrors.message}</span>
      {/if}
    </div>

    <button
      type="submit"
      class="submit-button"
      disabled={isLoading}
    >
      {#if isLoading}
        <span class="spinner"></span>
        Sending...
      {:else}
        <i data-feather="send"></i>
        Send Message
      {/if}
    </button>
  </form>

  {#if showSuccess}
    <div class="alert alert-success">
      <i data-feather="check-circle"></i>
      <span>Message sent successfully! We'll get back to you soon.</span>
    </div>
  {/if}

  {#if showError}
    <div class="alert alert-error">
      <i data-feather="alert-circle"></i>
      <span>{errorMessage}</span>
    </div>
  {/if}
</div>

<style>
  .contact-form-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form-subtitle {
    color: var(--text-light);
    opacity: 0.8;
    font-size: 1.1rem;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-light);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .required {
    color: var(--primary);
    font-size: 0.85rem;
  }

  .form-input {
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: var(--text-light);
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
    backdrop-filter: blur(10px);
  }

  .form-input:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .form-input:focus:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(104, 109, 224, 0.1);
  }

  .form-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-input.error {
    border-color: #ff6b6b;
  }

  .form-input::placeholder {
    color: var(--text-light);
    opacity: 0.4;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }

  .error-message {
    color: #ff6b6b;
    font-size: 0.85rem;
    margin-top: -0.25rem;
  }

  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
  }

  .submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(104, 109, 224, 0.3);
  }

  .submit-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  .submit-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  .submit-button:hover:not(:disabled)::before {
    left: 100%;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    margin-top: 1.5rem;
    animation: slideUp 0.3s ease-out;
  }

  .alert-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
  }

  .alert-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }

  @keyframes slideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Light mode styles */
  :global(body.light-mode) .form-label {
    color: var(--text-dark);
  }

  :global(body.light-mode) .form-subtitle {
    color: var(--text-dark);
  }

  :global(body.light-mode) .form-input {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
    color: var(--text-dark);
  }

  :global(body.light-mode) .form-input:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.2);
  }

  :global(body.light-mode) .form-input:focus:not(:disabled) {
    background: white;
    box-shadow: 0 0 0 3px rgba(104, 109, 224, 0.15);
  }

  :global(body.light-mode) .form-input::placeholder {
    color: var(--text-dark);
    opacity: 0.5;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .contact-form-container {
      padding: 1.5rem 1rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-title {
      font-size: 1.75rem;
    }

    .form-subtitle {
      font-size: 1rem;
    }

    .submit-button {
      font-size: 1rem;
      padding: 0.875rem 1.75rem;
    }
  }
</style>
