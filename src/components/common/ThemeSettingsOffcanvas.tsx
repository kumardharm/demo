// @ts-nocheck
type ThemeSettingsOffcanvasProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const ThemeSettingsOffcanvas = ({ isOpen, onClose }: ThemeSettingsOffcanvasProps) => {
  const isControlled = typeof isOpen === "boolean";

  return (
  <form
    className={`offcanvas offcanvas-start offcanvas-narrow${isControlled && isOpen ? " show" : ""}`}
    tabIndex={-1}
    id="offcanvasSettings"
    role="dialog"
    aria-modal={isControlled && isOpen ? "true" : undefined}
    aria-hidden={isControlled ? (isOpen ? "false" : "true") : undefined}
    style={isControlled ? { visibility: isOpen ? "visible" : "hidden" } : undefined}
  >
    <div className="offcanvas-header">
      <h2 className="offcanvas-title">Theme Settings</h2>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        data-bs-dismiss="offcanvas"
        onClick={onClose}
      ></button>
    </div>
    <div className="offcanvas-body d-flex flex-column">
      <div>
        <div className="mb-4">
          <label className="form-label">Color mode</label>
          <p className="form-hint">Choose the color mode for your app.</p>
          <label className="form-check">
            <div className="form-selectgroup-item">
              <input type="radio" name="theme" value="light" className="form-check-input" defaultChecked />
              <div className="form-check-label">Light</div>
            </div>
          </label>
          <label className="form-check">
            <div className="form-selectgroup-item">
              <input type="radio" name="theme" value="dark" className="form-check-input" />
              <div className="form-check-label">Dark</div>
            </div>
          </label>
        </div>
        <div className="mb-4">
          <label className="form-label">Color scheme</label>
          <p className="form-hint">The perfect color mode for your app.</p>
          <div className="row g-2">
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="blue" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-blue"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="azure" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-azure"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="indigo" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-indigo"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="purple" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-purple"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="pink" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-pink"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="red" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-red"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="orange" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-orange"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="yellow" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-yellow"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="lime" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-lime"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="green" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-green"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="teal" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-teal"></span>
              </label>
            </div>
            <div className="col-auto">
              <label className="form-colorinput">
                <input name="theme-primary" type="radio" value="cyan" className="form-colorinput-input" />
                <span className="form-colorinput-color bg-cyan"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Font family</label>
          <p className="form-hint">Choose the font family that fits your app.</p>
          <div>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-font" value="sans-serif" className="form-check-input" defaultChecked />
                <div className="form-check-label">Sans-serif</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-font" value="serif" className="form-check-input" />
                <div className="form-check-label">Serif</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-font" value="monospace" className="form-check-input" />
                <div className="form-check-label">Monospace</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-font" value="comic" className="form-check-input" />
                <div className="form-check-label">Comic</div>
              </div>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Theme base</label>
          <p className="form-hint">Choose the gray shade for your app.</p>
          <div>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-base" value="slate" className="form-check-input" />
                <div className="form-check-label">Slate</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-base" value="gray" className="form-check-input" defaultChecked />
                <div className="form-check-label">Gray</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-base" value="zinc" className="form-check-input" />
                <div className="form-check-label">Zinc</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-base" value="neutral" className="form-check-input" />
                <div className="form-check-label">Neutral</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-base" value="stone" className="form-check-input" />
                <div className="form-check-label">Stone</div>
              </div>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">Theme radius</label>
          <p className="form-hint">Choose the radius of your app.</p>
          <div>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-radius" value="0" className="form-check-input" />
                <div className="form-check-label">0px</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-radius" value="0.5" className="form-check-input" />
                <div className="form-check-label">2px</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-radius" value="1" className="form-check-input" defaultChecked />
                <div className="form-check-label">4px</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-radius" value="1.5" className="form-check-input" />
                <div className="form-check-label">6px</div>
              </div>
            </label>
            <label className="form-check">
              <div className="form-selectgroup-item">
                <input type="radio" name="theme-radius" value="2" className="form-check-input" />
                <div className="form-check-label">8px</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="d-flex">
          <a
            href="#"
            className="btn btn-outline-primary w-100"
            data-bs-dismiss="offcanvas"
            onClick={onClose}
          >
            Close
          </a>
        </div>
        <button type="button" className="btn w-100" id="reset-changes">
          Reset changes
        </button>
      </div>
    </div>
  </form>
  );
};

export default ThemeSettingsOffcanvas;
