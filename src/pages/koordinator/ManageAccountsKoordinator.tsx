import React from "react";
import Layout from "../../components/role/Layout";
import {sidebarKoordinatorItems} from "../../components/SidebarItems";
import ManageAkunKoordinator from "../../components/role/koordinator/ManageAkunKoordinator";
import {Spinner} from "flowbite-react";
import {ManageAccountSkeleton} from "../LoadingInterface";

const ManajemenAkunKoordinatorPages = () => {

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 detik itu cuman simulasi
    }, []);

    return (
        <div>
            <Layout
                sidebarItems={sidebarKoordinatorItems}
                subpageTitle="Managemen Akun"
            >
                {isLoading ? (
                    <div className="relative w-full h-full bg-gray-100">
                        {/* Skeleton Background */}
                        <ManageAccountSkeleton numberOfCards={12} />

                        {/* Spinner dan Teks di Tengah */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                            <Spinner size="xl" color="gray" />
                            <p className="text-gray-600 font-medium">
                                Loading, mohon tunggu...
                            </p>
                        </div>
                    </div>
                ) : (
                    <ManageAkunKoordinator />
                )}
            </Layout>
        </div>
    );
};

export default ManajemenAkunKoordinatorPages;