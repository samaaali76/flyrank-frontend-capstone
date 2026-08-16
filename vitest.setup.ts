import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

// jsdom doesn't implement scrollTo — ChatInterface calls it to
// auto-scroll on new messages, so we stub it out for tests.
Element.prototype.scrollTo = () => {};