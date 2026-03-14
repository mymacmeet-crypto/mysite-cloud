/* eslint-disable max-len */
import { MagModal } from "./magModal";

export default {
  title: "Components/MagModal",
};

/** Default — Medium modal */
export const Default = {
  render: () =>
    MagModal({
      buttonText: "Open Modal",
      title: "Welcome to Our Newsletter",
      modalSize: "mag-modal-size-medium",
      contentPadding: "mag-modal-padding-medium",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;'>Subscribe to our newsletter to stay updated with the latest articles, news, and exclusive content.</p><form style='display: flex; flex-direction: column; gap: 16px;'><input type='email' placeholder='Enter your email' style='padding: 12px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem;' /><button type='submit' style='padding: 14px; background: #343434; color: white; border: none; border-radius: 4px; font-size: 1rem; font-weight: 600; cursor: pointer;'>Subscribe Now</button></form>",
    }),
};

/** Small Modal */
export const SmallModal = {
  render: () =>
    MagModal({
      buttonText: "Quick Info",
      title: "Important Notice",
      modalSize: "mag-modal-size-small",
      contentPadding: "mag-modal-padding-small",
      content:
        "<p style='font-size: 1rem; line-height: 1.6; margin: 0;'>This is a compact modal for brief messages and notifications.</p>",
    }),
};

/** Large Modal */
export const LargeModal = {
  render: () =>
    MagModal({
      buttonText: "View Details",
      title: "Complete Product Information",
      modalSize: "mag-modal-size-large",
      contentPadding: "mag-modal-padding-large",
      content:
        "<div style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;'><div><h3 style='margin-top: 0;'>Features</h3><ul style='line-height: 2;'><li>Feature One</li><li>Feature Two</li><li>Feature Three</li></ul></div><div><h3 style='margin-top: 0;'>Specifications</h3><ul style='line-height: 2;'><li>Spec One</li><li>Spec Two</li><li>Spec Three</li></ul></div></div>",
    }),
};

/** Fullscreen Modal */
export const FullscreenModal = {
  render: () =>
    MagModal({
      buttonText: "Open Gallery",
      title: "Photo Gallery",
      modalSize: "mag-modal-size-fullscreen",
      contentPadding: "mag-modal-padding-large",
      content:
        "<div style='display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;'><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div><div style='background: #e5e7eb; aspect-ratio: 1; border-radius: 8px;'></div></div>",
    }),
};

/** No Padding */
export const NoPadding = {
  render: () =>
    MagModal({
      buttonText: "View Image",
      title: "Full Width Image",
      modalSize: "mag-modal-size-medium",
      contentPadding: "mag-modal-padding-none",
      content:
        "<img src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' alt='Architecture' style='width: 100%; display: block;' />",
    }),
};

/** Form Modal */
export const FormModal = {
  render: () =>
    MagModal({
      buttonText: "Contact Us",
      title: "Get in Touch",
      modalSize: "mag-modal-size-medium",
      contentPadding: "mag-modal-padding-medium",
      content: `
        <form style='display: flex; flex-direction: column; gap: 20px;'>
          <div>
            <label style='display: block; margin-bottom: 8px; font-weight: 600;'>Name</label>
            <input type='text' placeholder='Your name' style='width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem;' />
          </div>
          <div>
            <label style='display: block; margin-bottom: 8px; font-weight: 600;'>Email</label>
            <input type='email' placeholder='your@email.com' style='width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem;' />
          </div>
          <div>
            <label style='display: block; margin-bottom: 8px; font-weight: 600;'>Message</label>
            <textarea rows='4' placeholder='Your message...' style='width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem; resize: vertical;'></textarea>
          </div>
          <button type='submit' style='padding: 14px; background: #343434; color: white; border: none; border-radius: 4px; font-size: 1rem; font-weight: 600; cursor: pointer;'>Send Message</button>
        </form>
      `,
    }),
};

/** No Title */
export const NoTitle = {
  render: () =>
    MagModal({
      buttonText: "Open Modal",
      modalSize: "mag-modal-size-medium",
      contentPadding: "mag-modal-padding-medium",
      content:
        "<p style='font-size: 1.1rem; line-height: 1.8; margin: 0;'>This modal has no title, with the close button aligned to the right in the header.</p>",
    }),
};
