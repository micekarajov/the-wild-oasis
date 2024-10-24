import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";

import Button from "../ui/Button";
import { useState } from "react";

import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>

            <Row>
                <CabinTable />

                <Button
                    onClick={() => setShowForm((show) => !show)}
                    variation="primary"
                >
                    {!showForm ? "Add new Cabin" : "Close Form"}
                </Button>

                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
