import { useState } from "react";
import { Button, Modal, Navbar } from "flowbite-react";
import { HeaderProps } from "../../interfaces/common.interfaces.ts";
import logo from "../../assets/logoimage.png";

const Header = ({
                    isLogin,
                    onLoginClick,
                    onGoToDashboardClick,
                }: HeaderProps) => {
    const [showModal, setShowModal] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    return (
        <>
            <Navbar>
                <Navbar.Brand href="#">
                    <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
                    <span className="text-xl font-bold text-primary-dark">SITRACK</span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    {isLogin ? (
                        <Button
                            outline
                            onClick={onGoToDashboardClick}
                            className="mr-2 hidden sm:block"
                        >
                            Pergi ke Dashboard
                        </Button>
                    ) : null}

                    <Button
                        onClick={isLogin ? () => setShowModal(true) : onLoginClick}
                        color={isLogin ? "failure" : "dark"}
                    >
                        {isLogin ? "Sign Out" : "Sign In"}
                    </Button>

                    <Navbar.Toggle className="ml-4" />
                </div>

                <Navbar.Collapse>
                    <a
                        href="#"
                        className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                    >
                        Beranda
                    </a>
                    <a
                        href="#features"
                        className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                    >
                        Fitur
                    </a>
                    <a
                        href="#flow"
                        className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                    >
                        Alur
                    </a>
                    <a
                        href="#faq"
                        className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                    >
                        FAQ
                    </a>
                </Navbar.Collapse>
            </Navbar>

            {/* Logout Confirmation Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>Logout Confirmation</Modal.Header>
                <Modal.Body>
                    <p className="text-xl">Apakah kamu yakin mau logout dari aplikasi?</p>
                    {isLogout && <div className="text-center">Loading...</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="failure"
                        onClick={() => {
                            setIsLogout(true);
                            onLoginClick();
                        }}
                    />
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Gak jadi deh
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;
