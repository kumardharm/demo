// @ts-nocheck
const MenuBar = ({ isNavbarOpen, onOpenSettings }) => {
  return (
    <header className="navbar-expand-md">
      <div className={`collapse navbar-collapse${isNavbarOpen ? " show" : ""}`} id="navbar-menu">
        <div className="navbar">
          <div className="container-xl">
            <div className="row flex-column flex-md-row flex-fill align-items-center">
              <div className="col">
                {/* BEGIN NAVBAR MENU */}
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="./">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/home */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg
                      ></span>
                      <span className="nav-link-title"> Home </span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/package */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                          <path d="M12 12l8 -4.5" />
                          <path d="M12 12l0 9" />
                          <path d="M12 12l-8 -4.5" />
                          <path d="M16 5.25l-8 4.5" /></svg
                      ></span>
                      <span className="nav-link-title"> Interface </span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="./accordion.html">
                            Accordion
                          </a>
                          <a className="dropdown-item" href="./alerts.html">
                            Alerts
                          </a>
                          <a className="dropdown-item" href="./badges.html">
                            Badges
                          </a>
                          <a className="dropdown-item" href="./blank.html">
                            Blank page
                          </a>
                          <a className="dropdown-item" href="./buttons.html">
                            Buttons
                          </a>
                          <div className="dropend">
                            <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                              Cards
                            </a>
                            <div className="dropdown-menu">
                              <a href="./cards.html" className="dropdown-item">Cards</a>
                              <a href="./cards-masonry.html" className="dropdown-item">Cards Masonry</a>
                              <a href="./cards-actions.html" className="dropdown-item">Card actions</a>
                            </div>
                          </div>
                          <a className="dropdown-item" href="./carousel.html">
                            Carousel
                          </a>
                          <a className="dropdown-item" href="./colors.html">
                            Colors
                          </a>
                          <a className="dropdown-item" href="./datagrid.html">
                            Data grid
                          </a>
                          <a className="dropdown-item" href="./dropdowns.html">
                            Dropdowns
                          </a>
                          <a className="dropdown-item" href="./modals.html">
                            Modals
                          </a>
                          <a className="dropdown-item" href="./navbars.html">
                            Navbars
                          </a>
                          <a className="dropdown-item" href="./offcanvas.html">
                            Offcanvas
                          </a>
                          <a className="dropdown-item" href="./pagination.html">
                            Pagination
                          </a>
                          <a className="dropdown-item" href="./progress.html">
                            Progress
                          </a>
                          <a className="dropdown-item" href="./placeholders.html">
                            Placeholders
                          </a>
                          <a className="dropdown-item" href="./spinners.html">
                            Spinners
                          </a>
                          <a className="dropdown-item" href="./tables.html">
                            Tables
                          </a>
                          <a className="dropdown-item" href="./tabs.html">
                            Tabs
                          </a>
                          <a className="dropdown-item" href="./tooltips.html">
                            Tooltips
                          </a>
                          <a className="dropdown-item" href="./typography.html">
                            Typography
                          </a>
                        </div>
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="./empty.html">
                            Empty
                          </a>
                          <a className="dropdown-item" href="./icons.html">
                            Icons
                          </a>
                          <a className="dropdown-item" href="./mailbox.html">
                            Mailbox
                          </a>
                          <a className="dropdown-item" href="./maps.html">
                            Maps
                          </a>
                          <a className="dropdown-item" href="./maps-vector.html">
                            Vector maps
                          </a>
                          <a className="dropdown-item" href="./maps-google.html">
                            Google maps
                          </a>
                          <a className="dropdown-item" href="./modals.html">
                            Modals
                          </a>
                          <a className="dropdown-item" href="./multistep.html">
                            Multi-step form
                          </a>
                          <a className="dropdown-item" href="./navigation.html">
                            Navigation
                          </a>
                          <a className="dropdown-item" href="./notifications.html">
                            Notifications
                          </a>
                          <a className="dropdown-item" href="./progress.html">
                            Progress
                          </a>
                          <a className="dropdown-item" href="./scrollspy.html">
                            Scrollspy
                          </a>
                          <a className="dropdown-item" href="./social.html">
                            Social
                          </a>
                          <a className="dropdown-item" href="./status.html">
                            Status
                          </a>
                          <a className="dropdown-item" href="./steps.html">
                            Steps
                          </a>
                          <a className="dropdown-item" href="./tags.html">
                            Tags
                          </a>
                          <a className="dropdown-item" href="./toasts.html">
                            Toasts
                          </a>
                          <a className="dropdown-item" href="./ui-carousel.html">
                            Carousel
                          </a>
                          <a className="dropdown-item" href="./typography.html">
                            Typography
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-forms" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/checkbox */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M9 11l3 3l8 -8" />
                          <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg
                      ></span>
                      <span className="nav-link-title"> Forms </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./form-elements.html">
                        Form elements
                      </a>
                      <a className="dropdown-item" href="./form-layout.html">
                        Form layout
                      </a>
                      <a className="dropdown-item" href="./form-check.html">
                        Form check
                      </a>
                      <a className="dropdown-item" href="./form-select.html">
                        Form select
                      </a>
                      <a className="dropdown-item" href="./form-input-mask.html">
                        Input mask
                      </a>
                      <a className="dropdown-item" href="./form-range.html">
                        Form range
                      </a>
                      <a className="dropdown-item" href="./form-upload.html">
                        Form upload
                      </a>
                      <a className="dropdown-item" href="./form-datepicker.html">
                        Datepicker
                      </a>
                      <a className="dropdown-item" href="./form-colorpicker.html">
                        Color picker
                      </a>
                      <a className="dropdown-item" href="./form-color-selector.html">
                        Color selector
                      </a>
                      <a className="dropdown-item" href="./form-image-check.html">
                        Image check
                      </a>
                      <a className="dropdown-item" href="./form-selectgroup.html">
                        Selectgroup
                      </a>
                      <a className="dropdown-item" href="./form-editors.html">
                        Form editors
                      </a>
                      <a className="dropdown-item" href="./form-validation.html">
                        Form validation
                      </a>
                      <a className="dropdown-item" href="./form-wizard.html">
                        Form wizard
                      </a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg
                      ></span>
                      <span className="nav-link-title"> Extra </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./empty.html">Empty</a>
                      <a className="dropdown-item" href="./cookie-banner.html">Cookie banner</a>
                      <a className="dropdown-item" href="./login.html">Login</a>
                      <a className="dropdown-item" href="./sign-up.html">Sign up</a>
                      <a className="dropdown-item" href="./forgot-password.html">Forgot password</a>
                      <a className="dropdown-item" href="./reset-password.html">Reset password</a>
                      <a className="dropdown-item" href="./settings.html">Settings</a>
                      <a className="dropdown-item" href="./blank.html">Blank page</a>
                      <a className="dropdown-item" href="./pricing.html">Pricing cards</a>
                      <a className="dropdown-item" href="./pricing-table.html">Pricing table</a>
                      <a className="dropdown-item" href="./faq.html">FAQ</a>
                      <a className="dropdown-item" href="./courses.html">Courses</a>
                      <a className="dropdown-item" href="./invoice.html">Invoice</a>
                      <a className="dropdown-item" href="./people.html">Users</a>
                      <a className="dropdown-item" href="./gallery.html">Gallery</a>
                      <a className="dropdown-item" href="./grid.html">Grid</a>
                      <a className="dropdown-item" href="./cards.html">Cards</a>
                      <a className="dropdown-item" href="./timeline.html">Timeline</a>
                      <a className="dropdown-item" href="./tasks.html">Tasks</a>
                      <a className="dropdown-item" href="./search.html">Search results</a>
                      <a className="dropdown-item" href="./tos.html">Terms of service</a>
                      <a className="dropdown-item" href="./auth-lock.html">Locked</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-layout" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/layout */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M4 14m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M14 14m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" /></svg
                      ></span>
                      <span className="nav-link-title"> Layout </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./layout-boxed.html">Boxed</a>
                      <a className="dropdown-item" href="./layout-combined.html">Combined</a>
                      <a className="dropdown-item" href="./layout-condensed.html">Condensed</a>
                      <a className="dropdown-item" href="./layout-fluid.html">Fluid</a>
                      <a className="dropdown-item" href="./layout-fluid-vertical.html">Fluid vertical</a>
                      <a className="dropdown-item" href="./layout-horizontal.html">Horizontal</a>
                      <a className="dropdown-item" href="./layout-navbar-dark.html">Navbar dark</a>
                      <a className="dropdown-item" href="./layout-navbar-overlap.html">Navbar overlap</a>
                      <a className="dropdown-item" href="./layout-navbar-sticky.html">Navbar sticky</a>
                      <a className="dropdown-item" href="./layout-rtl.html">RTL mode</a>
                      <a className="dropdown-item" href="./layout-vertical.html">Vertical</a>
                      <a className="dropdown-item" href="./layout-vertical-transparent.html">Vertical transparent</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-plugins" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/puzzle */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M4 14m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" />
                          <path d="M14 14m0 2a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2z" /></svg
                      ></span>
                      <span className="nav-link-title"> Plugins </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./charts.html">Charts</a>
                      <a className="dropdown-item" href="./maps.html">Maps</a>
                      <a className="dropdown-item" href="./maps-vector.html">Vector maps</a>
                      <a className="dropdown-item" href="./maps-google.html">Google maps</a>
                      <a className="dropdown-item" href="./datatables.html">Data tables</a>
                      <a className="dropdown-item" href="./music.html">Music</a>
                      <a className="dropdown-item" href="./calendar.html">Calendar</a>
                      <a className="dropdown-item" href="./carousel.html">Carousel</a>
                      <a className="dropdown-item" href="./drag-and-drop.html">Drag & drop</a>
                      <a className="dropdown-item" href="./dropzone.html">Dropzone</a>
                      <a className="dropdown-item" href="./gallery.html">Gallery</a>
                      <a className="dropdown-item" href="./lightbox.html">Lightbox</a>
                      <a className="dropdown-item" href="./markdown.html">Markdown</a>
                      <a className="dropdown-item" href="./notification.html">Notification</a>
                      <a className="dropdown-item" href="./scrollable.html">Scrollable</a>
                      <a className="dropdown-item" href="./sortable.html">Sortable</a>
                      <a className="dropdown-item" href="./sweetalert.html">Sweetalert</a>
                      <a className="dropdown-item" href="./tinymce.html">TinyMCE</a>
                      <a className="dropdown-item" href="./summernote.html">Summernote</a>
                      <a className="dropdown-item" href="./nouislider.html">NoUISlider</a>
                      <a className="dropdown-item" href="./star-rating.html">Star rating</a>
                      <a className="dropdown-item" href="./html5-editor.html">HTML5 editor</a>
                      <a className="dropdown-item" href="./select2.html">Select2</a>
                      <a className="dropdown-item" href="./vector-maps.html">Vector maps</a>
                      <a className="dropdown-item" href="./tinymce.html">TinyMCE</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-addons" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/bolt */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M13 3l-7 9h6l-1 8l7 -9h-6l1 -8z" /></svg
                      ></span>
                      <span className="nav-link-title"> Addons </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./icons.html">Icons</a>
                      <a className="dropdown-item" href="./emails.html">Emails</a>
                      <a className="dropdown-item" href="./users.html">Users</a>
                      <a className="dropdown-item" href="./products.html">Products</a>
                      <a className="dropdown-item" href="./invoice.html">Invoice</a>
                      <a className="dropdown-item" href="./pricing.html">Pricing cards</a>
                      <a className="dropdown-item" href="./pricing-table.html">Pricing table</a>
                      <a className="dropdown-item" href="./tickets.html">Tickets</a>
                      <a className="dropdown-item" href="./music.html">Music</a>
                      <a className="dropdown-item" href="./calendar.html">Calendar</a>
                      <a className="dropdown-item" href="./gallery.html">Gallery</a>
                      <a className="dropdown-item" href="./cards.html">Cards</a>
                      <a className="dropdown-item" href="./apps.html">Apps</a>
                      <a className="dropdown-item" href="./gallery.html">Gallery</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#navbar-help" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                      <span className="nav-link-icon d-md-none d-lg-inline-block"
                        >{/* Download SVG icon from http://tabler.io/icons/icon/help */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path d="M12 3a9 9 0 1 0 9 9a9 9 0 0 0 -9 -9z" />
                          <path d="M12 16v.01" />
                          <path d="M12 13a2 2 0 0 0 0 -4a2 2 0 0 0 0 4z" /></svg
                      ></span>
                      <span className="nav-link-title"> Help </span>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="./help.html">Help center</a>
                      <a className="dropdown-item" href="./help-docs.html">Documentation</a>
                      <a className="dropdown-item" href="./help-blog.html">Blog</a>
                      <a className="dropdown-item" href="./help-changelog.html">Changelog</a>
                      <a className="dropdown-item" href="./help-faq.html">FAQ</a>
                      <a className="dropdown-item" href="./help-support.html">Support</a>
                    </div>
                  </li>
                </ul>
                {/* END NAVBAR MENU */}
              </div>
              <div className="col col-md-auto">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      aria-controls="offcanvasSettings"
                      onClick={(event) => {
                        event.preventDefault();
                        onOpenSettings();
                      }}
                    >
                      <span className="badge badge-sm bg-red text-red-fg">New</span>
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler.io/icons/icon/settings */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          <path
                            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                          />
                          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                      </span>
                      <span className="nav-link-title"> Theme Settings </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuBar;
