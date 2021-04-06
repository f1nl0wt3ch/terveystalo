const HEADERS = {
    'content-type': 'application/json;charset=UTF-8'
}

export async function findAll(uri: string) {
    const res = await window.fetch(uri, {
        method: 'GET',
        headers: HEADERS
    })
    if (res.status === 200) {
        return res.json()
    } else {
        throw new Error("Something went wrong with findAll");
    }
}

export async function findMeasurementById(uri: string) {
    const res = await window.fetch(uri, {
        method: 'GET',
        headers: HEADERS
    })
    if (res.status === 200) {
        return res.json()
    } else if (res.status === 404) {
        throw new Error("Entered id not found.");
    } else {
        throw new Error("Something went wrong with findMeasurementById.");
    }
}

export async function insertNewMeasurement(uri: string, insertedMeasurement: any) {
    const res = await window.fetch(uri, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            data: insertedMeasurement
        })
    })
    if (res.status === 200) {
        return res.json()
    } else {
        throw new Error("Something went wrong with insertNewMeasurement");
    }
}

export async function updateMeasurement(uri: string, updatedMeasurement: any) {
    const res = await window.fetch(uri, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
            data: updatedMeasurement
        })
    })
    if (res.status === 200) {
        return res.json()
    } else {
        throw new Error("Something went wrong with updateMeasurement");
    }
}

export async function deleteMeasurement(uri: string, deletedIdArr: Array<number>) {
    const res = await window.fetch(uri, {
        method: 'DELETE',
        headers: HEADERS,
        body: JSON.stringify({
            data: deletedIdArr
        })
    })
    if (res.status === 200) {
        return res.json()
    } else {
        throw new Error("Something went wrong with deleteMeasurement");
    }
}
