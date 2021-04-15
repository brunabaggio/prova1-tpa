var customers = []

const getCustomersAllDependents = (req, res) => {
    var cpf = req.params.cpf;
    var result = [];
    customers.forEach(el => {
        if (cpf == el.cpf) {
            result.push(el)
        }
    })
    if (result.length == 0) res.json({ message: "Customer not found" }, 404)
    res.json(result)
}

const deleteCustomers = (req, res) => {
    var cpf = `${req.params.cpf}`;
    let valid = false;
    for (let i = 0; i < customers.length; i++) {
        console.log(customers[i].cpfPortador)
        console.log(cpf)
        if (cpf == customers[i].cpfPortador) {
            customers.splice(i, 1);
            valid = true;
        }
    }

    if (!valid) res.json({ message: "Customer not found" }, 404)
    else res.json({}, 200)
}

const getCustomersById = (req, res) => {
    var cpf = `${req.params.cpf}`;
    customers.forEach(el => {
        console.log(cpf)
        console.log(el.cpf)
        if (cpf == el.cpf) res.json(el)
    })
    res.json({ message: "Customer not found" }, 404)
}

const updateCustomers = (req, res) => {
    var body = req.body;
    let valid = false;
    for (let i = 0; i < customers.length; i++) {
        if (cpf == customers[i].cpf) {
            customers[i] = body;
            valid = true;
        }
    }
    if (!valid) res.json({ message: "Customer not found" }, 404)
    res.json({}, 200)
}

const getAllCustomers = (req, res) => {
    return res.send(customers)
}

const newCustomers = (req, res) => {
    var body = req.body;

    if (body.nome) res.status(405)
    if (body.cpf) res.status(405)
    if (body.cpfPortador) res.status(405)
    if (body.dataNascimento) res.status(405)

    var customer = {
        'nome': body.nome,
        'cpf': body.cpf,
        'cpfTitular': body.cpfPortador,
        'dataNascimento': body.dataNascimento,
    }
    customers.push(customer)
    res.json({}, 200)

}

module.exports = {
    getCustomersAllDependents,
    deleteCustomers,
    getCustomersById,
    updateCustomers,
    getAllCustomers,
    newCustomers
}
